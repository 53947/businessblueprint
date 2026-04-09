/**
 * Object Storage — Cloudflare R2 (S3-compatible)
 * Replaces Replit Object Storage sidecar.
 * Used by mediaStorage.ts for / post media uploads.
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;
const r2AccessKey = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const r2SecretKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET;

let s3Client: S3Client | null = null;

if (r2Endpoint && r2AccessKey && r2SecretKey) {
  s3Client = new S3Client({
    region: "auto",
    endpoint: r2Endpoint,
    credentials: {
      accessKeyId: r2AccessKey,
      secretAccessKey: r2SecretKey,
    },
  });
}

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

export class ObjectStorageService {
  constructor() {}

  isConfigured(): boolean {
    return s3Client !== null && !!r2Bucket;
  }

  async uploadBuffer(buffer: Buffer, key: string, contentType: string): Promise<string> {
    if (!s3Client || !r2Bucket) {
      throw new Error("Cloudflare R2 not configured. Set CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY, and CLOUDFLARE_R2_BUCKET.");
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: r2Bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000",
    }));

    // Return a signed GET URL valid for 1 year
    const url = await getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: r2Bucket,
      Key: key,
    }), { expiresIn: 31536000 });

    return url;
  }

  async deleteObject(key: string): Promise<void> {
    if (!s3Client || !r2Bucket) return;

    try {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: r2Bucket,
        Key: key,
      }));
    } catch (error) {
      console.error("[R2] Delete error:", error);
    }
  }

  async getPublicUrl(key: string): Promise<string> {
    if (!s3Client || !r2Bucket) {
      throw new Error("Cloudflare R2 not configured.");
    }

    return await getSignedUrl(s3Client, new GetObjectCommand({
      Bucket: r2Bucket,
      Key: key,
    }), { expiresIn: 31536000 });
  }
}
