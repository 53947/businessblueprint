import { nanoid } from 'nanoid';
import sharp from 'sharp';
import { db } from '../db';
import { contentMedia } from '@shared/schema';
import { eq, and, sql } from 'drizzle-orm';
import { ObjectStorageService } from '../objectStorage';

const objectStorage = new ObjectStorageService();

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
  async uploadMedia(options: UploadMediaOptions) {
    const { clientId, file, fileName, mimeType, folder = 'Uploads', altText, tags } = options;
    
    const ext = fileName.split('.').pop() || '';
    const storageKey = `content/${clientId}/${folder}/${nanoid()}.${ext}`;
    
    const fileType = this.determineFileType(mimeType);
    const metadata = await this.getMediaMetadata(file, mimeType, fileType);
    
    let thumbnailUrl: string | null = null;
    if (fileType === 'video') {
      thumbnailUrl = await this.generateVideoThumbnail(file, storageKey);
    }
    
    const storageUrl = await objectStorage.uploadBuffer(file, storageKey, mimeType);
    
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
  
  async deleteMedia(mediaId: number, clientId: number) {
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
    
    await objectStorage.deleteObject(media.storageKey);
    
    if (media.thumbnailUrl) {
      const thumbnailKey = media.thumbnailUrl.split('/').slice(-3).join('/');
      await objectStorage.deleteObject(thumbnailKey);
    }
    
    await db
      .delete(contentMedia)
      .where(and(
        eq(contentMedia.id, mediaId),
        eq(contentMedia.clientId, clientId)
      ));
    
    return { success: true };
  }
  
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
  
  async incrementUsageCount(mediaId: number) {
    await db
      .update(contentMedia)
      .set({ usageCount: sql`${contentMedia.usageCount} + 1` })
      .where(eq(contentMedia.id, mediaId));
  }
  
  private determineFileType(mimeType: string): 'image' | 'video' | 'gif' {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'image/gif') return 'gif';
    if (mimeType.startsWith('image/')) return 'image';
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  
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
      return {
        fileSize,
        fileType: 'video',
        duration: undefined,
      };
    }
    
    return { fileSize, fileType: 'image' };
  }
  
  private async generateVideoThumbnail(file: Buffer, storageKey: string): Promise<string | null> {
    console.log('[MediaStorage] Video thumbnail generation not yet implemented');
    return null;
  }
}

export const mediaStorageService = new MediaStorageService();
