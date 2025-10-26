import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import { db } from '../db';
import { contentMedia } from '@shared/schema';
import { eq, and, sql } from 'drizzle-orm';

// R2/S3 Configuration - Validate credentials at startup
const validateStorageConfig = () => {
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET || process.env.S3_BUCKET;
  
  if (!accessKeyId || !secretAccessKey) {
    console.warn('[MediaStorage] WARNING: S3/R2 credentials not configured. Media uploads will fail. Set CLOUDFLARE_R2_ACCESS_KEY_ID and CLOUDFLARE_R2_SECRET_ACCESS_KEY.');
    return false;
  }
  
  if (!bucket) {
    console.warn('[MediaStorage] WARNING: S3/R2 bucket not configured. Set CLOUDFLARE_R2_BUCKET.');
    return false;
  }
  
  return true;
};

const isConfigured = validateStorageConfig();

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_R2_REGION || 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || process.env.S3_BUCKET || 'business-blueprint-content';
const CDN_URL = process.env.CLOUDFLARE_R2_CDN_URL || process.env.CDN_URL;

export interface UploadMediaOptions {
  clientId: number;
  file: Buffer;
  fileName: string;
  mimeType: string;
  folder?: string;
  altText?: string;
  tags?: string[];
}

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number;
  fileSize: number;
  fileType: 'image' | 'video' | 'gif';
}

export class MediaStorageService {
  /**
   * Upload media to R2/S3 and save metadata to database
   */
  async uploadMedia(options: UploadMediaOptions) {
    if (!isConfigured) {
      throw new Error('Media storage is not configured. Please set CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, and CLOUDFLARE_R2_BUCKET environment variables.');
    }
    
    const { clientId, file, fileName, mimeType, folder = 'Uploads', altText, tags } = options;
    
    // Generate unique storage key
    const ext = fileName.split('.').pop() || '';
    const storageKey = `content/${clientId}/${folder}/${nanoid()}.${ext}`;
    
    // Determine file type
    const fileType = this.determineFileType(mimeType);
    
    // Get metadata (dimensions for images/videos)
    const metadata = await this.getMediaMetadata(file, mimeType, fileType);
    
    // Generate thumbnail for videos
    let thumbnailUrl: string | null = null;
    if (fileType === 'video') {
      thumbnailUrl = await this.generateVideoThumbnail(file, storageKey);
    }
    
    // Upload to R2/S3
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: storageKey,
        Body: file,
        ContentType: mimeType,
        CacheControl: 'public, max-age=31536000', // 1 year cache
      },
    });
    
    await upload.done();
    
    // Generate public URL
    const storageUrl = CDN_URL 
      ? `${CDN_URL}/${storageKey}`
      : `https://${BUCKET_NAME}.s3.amazonaws.com/${storageKey}`;
    
    // Save to database
    const [mediaRecord] = await db
      .insert(contentMedia)
      .values({
        clientId,
        fileName,
        fileSize: metadata.fileSize,
        mimeType,
        fileType,
        storageKey,
        storageUrl,
        thumbnailUrl,
        width: metadata.width,
        height: metadata.height,
        duration: metadata.duration,
        altText,
        folder,
        tags: tags || [],
      })
      .returning();
    
    return mediaRecord;
  }
  
  /**
   * Delete media from R2/S3 and database
   */
  async deleteMedia(mediaId: number, clientId: number) {
    // Get media record
    const [media] = await db
      .select()
      .from(contentMedia)
      .where(and(
        eq(contentMedia.id, mediaId),
        eq(contentMedia.clientId, clientId)
      ));
    
    if (!media) {
      throw new Error('Media not found or unauthorized');
    }
    
    // Delete from R2/S3
    await s3Client.send(new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: media.storageKey,
    }));
    
    // Delete thumbnail if exists
    if (media.thumbnailUrl) {
      const thumbnailKey = media.thumbnailUrl.split('/').slice(-3).join('/');
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: thumbnailKey,
      }));
    }
    
    // Delete from database
    await db
      .delete(contentMedia)
      .where(and(
        eq(contentMedia.id, mediaId),
        eq(contentMedia.clientId, clientId)
      ));
    
    return { success: true };
  }
  
  /**
   * Get all media for a client
   */
  async getClientMedia(clientId: number, folder?: string) {
    const query = folder
      ? and(eq(contentMedia.clientId, clientId), eq(contentMedia.folder, folder))
      : eq(contentMedia.clientId, clientId);
    
    return await db
      .select()
      .from(contentMedia)
      .where(query)
      .orderBy(contentMedia.createdAt);
  }
  
  /**
   * Get media by ID
   */
  async getMediaById(mediaId: number, clientId: number) {
    const [media] = await db
      .select()
      .from(contentMedia)
      .where(and(
        eq(contentMedia.id, mediaId),
        eq(contentMedia.clientId, clientId)
      ));
    
    return media;
  }
  
  /**
   * Update media metadata (alt text, tags, folder)
   */
  async updateMediaMetadata(mediaId: number, clientId: number, updates: {
    altText?: string;
    tags?: string[];
    folder?: string;
  }) {
    const [updated] = await db
      .update(contentMedia)
      .set(updates)
      .where(and(
        eq(contentMedia.id, mediaId),
        eq(contentMedia.clientId, clientId)
      ))
      .returning();
    
    return updated;
  }
  
  /**
   * Increment usage count when media is used in a post
   */
  async incrementUsageCount(mediaId: number) {
    await db
      .update(contentMedia)
      .set({ usageCount: sql`${contentMedia.usageCount} + 1` })
      .where(eq(contentMedia.id, mediaId));
  }
  
  /**
   * Determine file type from MIME type
   */
  private determineFileType(mimeType: string): 'image' | 'video' | 'gif' {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'image/gif') return 'gif';
    if (mimeType.startsWith('image/')) return 'image';
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  
  /**
   * Get media metadata (dimensions, size)
   */
  private async getMediaMetadata(file: Buffer, mimeType: string, fileType: string): Promise<MediaMetadata> {
    const fileSize = file.length;
    
    if (fileType === 'image' || fileType === 'gif') {
      try {
        const image = sharp(file);
        const metadata = await image.metadata();
        return {
          width: metadata.width,
          height: metadata.height,
          fileSize,
          fileType: fileType as 'image' | 'gif',
        };
      } catch (error) {
        console.error('Error getting image metadata:', error);
        return { fileSize, fileType: fileType as 'image' | 'gif' };
      }
    }
    
    if (fileType === 'video') {
      // Video metadata extraction would require ffmpeg
      // For now, return basic info
      // TODO: Implement video metadata extraction with ffmpeg
      return {
        fileSize,
        fileType: 'video',
        duration: undefined, // Would need ffmpeg
      };
    }
    
    return { fileSize, fileType: 'image' };
  }
  
  /**
   * Generate thumbnail for video
   */
  private async generateVideoThumbnail(file: Buffer, storageKey: string): Promise<string | null> {
    // TODO: Implement video thumbnail generation with ffmpeg
    // For now, return null
    // This would require:
    // 1. Extract first frame using ffmpeg
    // 2. Resize to thumbnail size
    // 3. Upload to R2/S3 with -thumb suffix
    console.log('[MediaStorage] Video thumbnail generation not yet implemented');
    return null;
  }
}

export const mediaStorageService = new MediaStorageService();
