import { db } from "../db";
import { products, assessmentProductRecommendations, assessments } from "@shared/schema";
import { eq, and, inArray } from "drizzle-orm";

interface AssessmentScores {
  visibility: number;
  reviews: number;
  completeness: number;
  engagement: number;
  overall: number;
}

interface ProductRecommendation {
  productId: number;
  productName: string;
  reason: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  currentScore: number;
  projectedScore: number;
  scoreImprovement: number;
  categoryAffected: string;
}

export class ProductRecommendationService {
  
  /**
   * Generate product recommendations based on assessment scores
   */
  async generateRecommendations(assessmentId: number, scores: AssessmentScores): Promise<ProductRecommendation[]> {
    const recommendations: ProductRecommendation[] = [];
    
    // Identify weak categories (score < 70)
    const weakCategories: { category: string; score: number; priority: string }[] = [];
    
    if (scores.visibility < 70) {
      weakCategories.push({ 
        category: 'visibility', 
        score: scores.visibility,
        priority: scores.visibility < 50 ? 'critical' : 'high'
      });
    }
    if (scores.reviews < 70) {
      weakCategories.push({ 
        category: 'reviews', 
        score: scores.reviews,
        priority: scores.reviews < 50 ? 'critical' : 'high'
      });
    }
    if (scores.completeness < 80) {
      weakCategories.push({ 
        category: 'completeness', 
        score: scores.completeness,
        priority: scores.completeness < 60 ? 'critical' : 'high'
      });
    }
    if (scores.engagement < 60) {
      weakCategories.push({ 
        category: 'engagement', 
        score: scores.engagement,
        priority: scores.engagement < 40 ? 'critical' : 'medium'
      });
    }

    // If no weak categories, return early
    if (weakCategories.length === 0) {
      return [];
    }

    // Fetch all active products
    const allProducts = await db.select().from(products).where(eq(products.isActive, true));

    // Match products to weak categories
    for (const weakCat of weakCategories) {
      const matchingProducts = allProducts.filter(product => 
        product.improvesCategory?.includes(weakCat.category)
      );

      for (const product of matchingProducts) {
        // Calculate projected improvement
        const improvement = this.calculateImprovement(product.productId!, weakCat.category);
        const projectedScore = Math.min(100, weakCat.score + improvement);

        recommendations.push({
          productId: product.id,
          productName: product.name,
          reason: this.generateReason(product.name, weakCat.category, weakCat.score),
          priority: weakCat.priority as 'critical' | 'high' | 'medium' | 'low',
          currentScore: weakCat.score,
          projectedScore,
          scoreImprovement: improvement,
          categoryAffected: weakCat.category
        });
      }
    }

    // Sort by priority and projected improvement
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    recommendations.sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.scoreImprovement - a.scoreImprovement;
    });

    return recommendations;
  }

  /**
   * Save recommendations to database
   */
  async saveRecommendations(assessmentId: number, recommendations: ProductRecommendation[]): Promise<void> {
    const insertData = recommendations.map(rec => ({
      assessmentId,
      productId: rec.productId,
      reason: rec.reason,
      priority: rec.priority,
      currentScore: rec.currentScore,
      projectedScore: rec.projectedScore,
      scoreImprovement: rec.scoreImprovement,
      categoryAffected: rec.categoryAffected
    }));

    if (insertData.length > 0) {
      await db.insert(assessmentProductRecommendations).values(insertData);
    }
  }

  /**
   * Calculate estimated improvement for a product
   */
  private calculateImprovement(productId: string, category: string): number {
    // Improvement estimates based on product type and category
    const improvements: Record<string, Record<string, number>> = {
      'business-listings': { visibility: 20, completeness: 15 },
      'review-management': { reviews: 25, engagement: 15 },
      'social-media-management': { engagement: 18, visibility: 12 },
      'local-seo': { visibility: 15 },
      'google-business-setup': { completeness: 30, visibility: 20 },
      'store-locator': { visibility: 12, completeness: 10 },
      'website-builder': { completeness: 18 }
    };

    return improvements[productId]?.[category] || 10;
  }

  /**
   * Generate human-readable reason for recommendation
   */
  private generateReason(productName: string, category: string, score: number): string {
    const reasons: Record<string, (name: string, score: number) => string> = {
      visibility: (name, score) => 
        `Your visibility score is ${score}/100. ${name} will help more customers find you online by distributing your business across 100+ directories and improving your local search presence.`,
      reviews: (name, score) => 
        `Your review score is ${score}/100. ${name} will help you collect more positive reviews, respond professionally, and build trust with potential customers.`,
      completeness: (name, score) => 
        `Your profile completeness is ${score}/100. ${name} will ensure your business information is complete and accurate across all platforms, making it easier for customers to contact you.`,
      engagement: (name, score) => 
        `Your engagement score is ${score}/100. ${name} will help you actively connect with customers through social media, reviews, and regular updates to your online presence.`
    };

    return reasons[category]?.(productName, score) || 
      `${productName} is recommended to improve your ${category} performance.`;
  }

  /**
   * Get recommendations for an assessment
   */
  async getRecommendations(assessmentId: number) {
    const recs = await db
      .select({
        id: assessmentProductRecommendations.id,
        product: products,
        reason: assessmentProductRecommendations.reason,
        priority: assessmentProductRecommendations.priority,
        currentScore: assessmentProductRecommendations.currentScore,
        projectedScore: assessmentProductRecommendations.projectedScore,
        scoreImprovement: assessmentProductRecommendations.scoreImprovement,
        categoryAffected: assessmentProductRecommendations.categoryAffected,
        isAccepted: assessmentProductRecommendations.isAccepted,
        isPurchased: assessmentProductRecommendations.isPurchased
      })
      .from(assessmentProductRecommendations)
      .innerJoin(products, eq(assessmentProductRecommendations.productId, products.id))
      .where(eq(assessmentProductRecommendations.assessmentId, assessmentId));

    return recs;
  }
}

export const productRecommendationService = new ProductRecommendationService();
