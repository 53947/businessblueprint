import { db } from '../db';
import { aiSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';
import type { AIProvider } from './ai-provider';

export class AISettingsService {
  async getProvider(feature: 'assessment' | 'prescription' | 'coach_blue'): Promise<AIProvider> {
    try {
      const [setting] = await db.select().from(aiSettings).where(eq(aiSettings.feature, feature)).limit(1);

      return (setting?.provider as AIProvider) || this.getDefaultProvider(feature);
    } catch (error) {
      console.error(`[AI Settings] Error fetching provider for ${feature}:`, error);
      return this.getDefaultProvider(feature);
    }
  }

  private getDefaultProvider(feature: string): AIProvider {
    switch (feature) {
      case 'coach_blue':
        return 'claude';
      case 'assessment':
      case 'prescription':
      default:
        return 'deepseek';
    }
  }

  async updateProvider(
    feature: 'assessment' | 'prescription' | 'coach_blue',
    provider: AIProvider,
    updatedBy?: number
  ) {
    const [existing] = await db.select().from(aiSettings).where(eq(aiSettings.feature, feature)).limit(1);

    if (existing) {
      await db
        .update(aiSettings)
        .set({
          provider,
          lastUpdated: new Date(),
          updatedBy,
        })
        .where(eq(aiSettings.feature, feature));
    } else {
      await db.insert(aiSettings).values({
        feature,
        provider,
        isActive: true,
        lastUpdated: new Date(),
        updatedBy,
      });
    }
    
    console.log(`[AI Settings] Updated ${feature} to use ${provider}`);
  }

  async getAllSettings() {
    try {
      const settings = await db.select().from(aiSettings);
      
      if (settings.length === 0) {
        await this.seedDefaults();
        return await db.select().from(aiSettings);
      }
      
      return settings;
    } catch (error) {
      console.error('[AI Settings] Error fetching all settings:', error);
      return [];
    }
  }

  async seedDefaults() {
    const defaults = [
      { feature: 'assessment', provider: 'deepseek', isActive: true },
      { feature: 'prescription', provider: 'deepseek', isActive: true },
      { feature: 'coach_blue', provider: 'claude', isActive: true },
    ];

    for (const setting of defaults) {
      const [existing] = await db.select().from(aiSettings).where(eq(aiSettings.feature, setting.feature)).limit(1);

      if (!existing) {
        await db.insert(aiSettings).values({
          feature: setting.feature,
          provider: setting.provider,
          isActive: setting.isActive,
          lastUpdated: new Date(),
        });
        console.log(`[AI Settings] Seeded default for ${setting.feature}: ${setting.provider}`);
      }
    }
  }
}

export const aiSettingsService = new AISettingsService();
