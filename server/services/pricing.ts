import { 
  SubscriptionPlan, 
  SubscriptionAddon, 
  SubscriptionAddonSelection 
} from "@shared/schema";

export interface PricingCalculation {
  basePrice: number;
  addonPrices: { addonId: string; name: string; price: number; }[];
  totalAddons: number;
  setupFee: number;
  subtotal: number;
  taxes: number;
  total: number;
  savings?: number;
  billingCycle: string;
}

export interface PricingInput {
  planId: string;
  selectedAddons: { addonId: string; quantity?: number; }[];
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  location?: string; // For tax calculation
}

export class PricingEngine {
  
  /**
   * Calculate total subscription cost with dynamic pricing
   */
  static calculateSubscriptionPrice(
    plan: SubscriptionPlan,
    addons: SubscriptionAddon[],
    selectedAddons: { addonId: string; quantity?: number; }[] = [],
    billingCycle: 'monthly' | 'quarterly' | 'annual' = 'monthly'
  ): PricingCalculation {
    
    // Base plan pricing with billing cycle discounts
    const basePrice = this.applyBillingCycleDiscount(
      parseFloat(plan.basePrice), 
      billingCycle
    );
    
    const setupFee = parseFloat(plan.setupFee || '0');
    
    // Calculate addon costs (with compatibility check)
    const addonPrices: { addonId: string; name: string; price: number; }[] = [];
    let totalAddons = 0;
    
    selectedAddons.forEach(selection => {
      const addon = addons.find(a => a.addonId === selection.addonId);
      if (addon && addon.compatiblePathways && addon.compatiblePathways.includes(plan.pathway)) {
        const quantity = selection.quantity || 1;
        const addonPrice = this.applyBillingCycleDiscount(
          parseFloat(addon.price) * quantity,
          billingCycle
        );
        
        addonPrices.push({
          addonId: addon.addonId,
          name: addon.name,
          price: addonPrice
        });
        
        totalAddons += addonPrice;
      }
    });
    
    // Calculate volume discounts on monthly equivalent amounts
    const monthlySubtotal = parseFloat(plan.basePrice) + 
      selectedAddons.reduce((sum, selection) => {
        const addon = addons.find(a => a.addonId === selection.addonId);
        if (addon && addon.compatiblePathways && addon.compatiblePathways.includes(plan.pathway)) {
          return sum + (parseFloat(addon.price) * (selection.quantity || 1));
        }
        return sum;
      }, 0);
    
    const volumeDiscount = this.calculateVolumeDiscount(monthlySubtotal, plan.pathway);
    const discountedMonthlySubtotal = monthlySubtotal - volumeDiscount;
    
    // Apply billing cycle discount to the discounted monthly subtotal
    const subtotal = this.applyBillingCycleDiscount(discountedMonthlySubtotal, billingCycle);
    
    // Calculate taxes on subtotal + setup fee (setup fees are typically taxable)
    const taxableAmount = subtotal + setupFee;
    const taxes = Math.round(taxableAmount * 0.085 * 100) / 100;
    
    const total = subtotal + taxes + setupFee;
    
    // Recalculate addon prices for display (already includes billing cycle discount)
    const displayAddonPrices: { addonId: string; name: string; price: number; }[] = [];
    let displayTotalAddons = 0;
    
    selectedAddons.forEach(selection => {
      const addon = addons.find(a => a.addonId === selection.addonId);
      if (addon && addon.compatiblePathways && addon.compatiblePathways.includes(plan.pathway)) {
        const quantity = selection.quantity || 1;
        const monthlyAddonPrice = parseFloat(addon.price) * quantity;
        const addonPrice = this.applyBillingCycleDiscount(monthlyAddonPrice, billingCycle);
        
        displayAddonPrices.push({
          addonId: addon.addonId,
          name: addon.name,
          price: addonPrice
        });
        
        displayTotalAddons += addonPrice;
      }
    });
    
    // Calculate cycle-adjusted savings for display consistency
    const cycleAdjustedSavings = volumeDiscount > 0 
      ? this.applyBillingCycleDiscount(volumeDiscount, billingCycle)
      : undefined;
    
    return {
      basePrice,
      addonPrices: displayAddonPrices,
      totalAddons: displayTotalAddons,
      setupFee,
      subtotal,
      taxes,
      total,
      savings: cycleAdjustedSavings,
      billingCycle
    };
  }
  
  /**
   * Apply billing cycle discounts (annual = 20% off, quarterly = 10% off)
   */
  private static applyBillingCycleDiscount(
    monthlyPrice: number, 
    billingCycle: 'monthly' | 'quarterly' | 'annual'
  ): number {
    switch (billingCycle) {
      case 'annual':
        return Math.round(monthlyPrice * 12 * 0.8 * 100) / 100; // 20% discount
      case 'quarterly':
        return Math.round(monthlyPrice * 3 * 0.9 * 100) / 100; // 10% discount
      case 'monthly':
      default:
        return monthlyPrice;
    }
  }
  
  /**
   * Calculate volume discounts for larger subscriptions
   */
  private static calculateVolumeDiscount(subtotal: number, pathway: string): number {
    if (pathway === 'msp') {
      // MSP volume discounts
      if (subtotal >= 1000) return Math.round(subtotal * 0.15 * 100) / 100; // 15% off $1000+
      if (subtotal >= 500) return Math.round(subtotal * 0.10 * 100) / 100;  // 10% off $500+
      if (subtotal >= 300) return Math.round(subtotal * 0.05 * 100) / 100;  // 5% off $300+
    } else if (pathway === 'diy') {
      // DIY volume discounts (smaller thresholds)
      if (subtotal >= 200) return Math.round(subtotal * 0.10 * 100) / 100; // 10% off $200+
      if (subtotal >= 100) return Math.round(subtotal * 0.05 * 100) / 100; // 5% off $100+
    }
    
    return 0;
  }
  
  /**
   * Get pathway-specific upselling recommendations
   */
  static getUpsellRecommendations(
    currentPlan: SubscriptionPlan,
    availablePlans: SubscriptionPlan[],
    availableAddons: SubscriptionAddon[]
  ): {
    planUpgrades: SubscriptionPlan[];
    recommendedAddons: SubscriptionAddon[];
  } {
    const pathway = currentPlan.pathway;
    
    // Find higher-tier plans in the same pathway
    const planUpgrades = availablePlans.filter(plan => 
      plan.pathway === pathway && 
      plan.id !== currentPlan.id &&
      parseFloat(plan.basePrice) > parseFloat(currentPlan.basePrice)
    ).slice(0, 2); // Top 2 upgrades
    
    // Get compatible add-ons for the pathway
    const recommendedAddons = availableAddons.filter(addon =>
      addon.compatiblePathways && 
      addon.compatiblePathways.includes(pathway) &&
      addon.isActive
    ).slice(0, 4); // Top 4 add-on recommendations
    
    return { planUpgrades, recommendedAddons };
  }
  
  /**
   * Calculate ROI projection for business value messaging
   */
  static calculateROIProjection(
    plan: SubscriptionPlan,
    addons: SubscriptionAddon[],
    businessData: {
      monthlyRevenue?: number;
      industryType?: string;
      digitalScore?: number;
    } = {}
  ): {
    estimatedROI: number;
    projectedRevIncrease: number;
    paybackPeriod: number | null; // months, null if invalid
    benefits: string[];
  } {
    const monthlyInvestment = parseFloat(plan.basePrice) + 
      addons.reduce((sum, addon) => sum + parseFloat(addon.price), 0);
    
    // ROI calculations based on industry benchmarks and digital marketing effectiveness
    const baseROI = plan.pathway === 'msp' ? 300 : 150; // MSP typically delivers higher ROI
    const digitalScoreMultiplier = (businessData.digitalScore || 70) / 100;
    const estimatedROI = Math.round(baseROI * digitalScoreMultiplier);
    
    // Revenue increase projection
    const currentRevenue = businessData.monthlyRevenue || 10000; // Default assumption
    const projectedRevIncrease = Math.round(currentRevenue * (estimatedROI / 100) / 12);
    
    // Payback period calculation with division-by-zero protection
    const paybackPeriod = projectedRevIncrease > 0 
      ? Math.ceil(monthlyInvestment / projectedRevIncrease)
      : null; // Return null for invalid scenarios
    
    // Benefits messaging based on pathway
    const benefits = plan.pathway === 'msp' ? [
      "Professional campaign management",
      "Dedicated account manager",
      "Advanced analytics and reporting",
      "Priority customer support",
      "Custom strategy development"
    ] : [
      "Self-paced learning resources",
      "Step-by-step implementation guides",
      "Community support access",
      "Basic analytics tools",
      "Cost-effective digital growth"
    ];
    
    return {
      estimatedROI,
      projectedRevIncrease,
      paybackPeriod,
      benefits
    };
  }
  
  /**
   * Generate pricing comparison for pathway decision
   */
  static comparePathwayPricing(
    mspPlans: SubscriptionPlan[],
    diyPlans: SubscriptionPlan[],
    addons: SubscriptionAddon[]
  ): {
    msp: { plan: SubscriptionPlan; pricing: PricingCalculation; }[];
    diy: { plan: SubscriptionPlan; pricing: PricingCalculation; }[];
    comparison: {
      avgMspPrice: number;
      avgDiyPrice: number;
      priceDifference: number;
      valueProposition: string;
    };
  } {
    
    const mspPricing = mspPlans.map(plan => ({
      plan,
      pricing: this.calculateSubscriptionPrice(plan, addons, [])
    }));
    
    const diyPricing = diyPlans.map(plan => ({
      plan,
      pricing: this.calculateSubscriptionPrice(plan, addons, [])
    }));
    
    const avgMspPrice = mspPricing.reduce((sum, p) => sum + p.pricing.total, 0) / mspPricing.length;
    const avgDiyPrice = diyPricing.reduce((sum, p) => sum + p.pricing.total, 0) / diyPricing.length;
    const priceDifference = avgMspPrice - avgDiyPrice;
    
    const valueProposition = `Managed Services costs $${Math.round(priceDifference)} more monthly but delivers professional implementation, dedicated support, and typically 2-3x faster results.`;
    
    return {
      msp: mspPricing,
      diy: diyPricing,
      comparison: {
        avgMspPrice: Math.round(avgMspPrice),
        avgDiyPrice: Math.round(avgDiyPrice),
        priceDifference: Math.round(priceDifference),
        valueProposition
      }
    };
  }
}