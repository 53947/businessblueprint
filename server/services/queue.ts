// Database-backed scheduler - No Redis/BullMQ needed
// This file kept for backwards compatibility during migration

// Empty export for backwards compatibility
export const contentPublishQueue = null;
export const synupSyncQueue = null;
export const redisConnection = null;
export const redisAvailable = false;

console.log('[Queue] Using database-backed scheduler (no Redis required)');
