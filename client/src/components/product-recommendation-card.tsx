import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageSquare, 
  Share2, 
  MessagesSquare,
  MapPin,
  Star,
  Globe,
  Users,
  Zap,
  ExternalLink,
  Gift
} from "lucide-react";

interface ProductRecommendation {
  id?: number;
  category: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedImpact: string;
  estimatedEffort: string;
  productId?: string;
  bundleId?: string;
  productBenefits?: string[];
  bundleAdvantage?: string;
}

interface ProductRecommendationCardProps {
  recommendation: ProductRecommendation;
  showBundleAdvantage?: boolean;
}

const CATEGORY_ICONS: Record<string, typeof Mail> = {
  'Email & SMS Marketing': Mail,
  'Social Media Content': Share2,
  'Reputation Management': Star,
  'Customer Response & Timing': MessagesSquare,
  'Live Chat': MessageSquare,
  'Business Listings': MapPin,
  'Google Business Profile': Globe,
  'Website & SEO': Zap,
  'CRM Systems': Users,
};

const PRODUCT_INFO: Record<string, { name: string; url: string; color: string }> = {
  'send': { name: '/ promote', url: '/promote', color: '#FFEF45' },
  'inbox': { name: '/ respond', url: '/respond', color: '#97ACCA' },
  'content': { name: '/ post', url: '/post', color: '#FF44CC' },
  'livechat': { name: '/ engage', url: '/engage', color: '#8000FF' },
  'listings': { name: '/ publish', url: '/publish', color: '#E00420' },
  'reputation': { name: '/ elevate', url: '/elevate', color: '#FFD700' },
  'anchor': { name: 'Anchor Suite', url: '/anchor', color: '#0000FF' },
  'relationships': { name: '/ connect', url: '/connect', color: '#008060' },
  'hostsBlue': { name: 'HostsBlue', url: 'https://hostsblue.com', color: '#F97316' },
  'scansBlue': { name: 'ScansBlue', url: 'https://scansblue.com', color: '#0000FF' },
  'swipesBlue': { name: 'SwipesBlue', url: 'https://swipesblue.com', color: '#F97316' },
};

const BUNDLE_INFO: Record<string, { name: string; savings: string; products: string[] }> = {
  'compass': {
    name: 'Compass Suite',
    savings: 'Save $37/month',
    products: ['/ promote', '/ respond', '/ post', '/ engage']
  },
  'anchor': {
    name: 'Anchor Suite',
    savings: 'Save $19/month',
    products: ['/ publish', '/ elevate', 'GBP Optimization']
  },
};

export function ProductRecommendationCard({ recommendation, showBundleAdvantage = true }: ProductRecommendationCardProps) {
  const Icon = CATEGORY_ICONS[recommendation.category] || Zap;
  const product = recommendation.productId ? PRODUCT_INFO[recommendation.productId] : null;
  const bundle = recommendation.bundleId ? BUNDLE_INFO[recommendation.bundleId] : null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isExternalUrl = (url: string) => url.startsWith('http');

  return (
    <Card 
      className="border-l-4 bg-white hover:shadow-md transition-shadow"
      style={{ borderLeftColor: product?.color || '#0000FF' }}
      data-testid={`recommendation-${recommendation.id || recommendation.category.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${product?.color || '#0000FF'}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: product?.color || '#0000FF' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#09080E]" style={{ fontFamily: 'Archivo, sans-serif' }}>
                {recommendation.title}
              </h3>
              <span className="text-sm text-gray-500">{recommendation.category}</span>
            </div>
          </div>
          <Badge className={getPriorityColor(recommendation.priority)}>
            {recommendation.priority}
          </Badge>
        </div>

        <p className="text-[#09080E] mb-4">{recommendation.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <strong>Impact:</strong> {recommendation.estimatedImpact}
          </span>
          <span className="flex items-center gap-1">
            <strong>Effort:</strong> {recommendation.estimatedEffort}
          </span>
        </div>

        {recommendation.productBenefits && recommendation.productBenefits.length > 0 && (
          <ul className="mb-4 space-y-1">
            {recommendation.productBenefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {product && (
            <Button
              variant="outline"
              className="border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white"
              onClick={() => {
                if (isExternalUrl(product.url)) {
                  window.open(product.url, '_blank');
                } else {
                  window.location.href = product.url;
                }
              }}
              data-testid={`learn-more-${recommendation.productId}`}
            >
              Learn More About {product.name}
              {isExternalUrl(product.url) && <ExternalLink className="w-3 h-3 ml-1" />}
            </Button>
          )}
        </div>

        {showBundleAdvantage && bundle && recommendation.bundleAdvantage && (
          <div className="mt-4 p-3 bg-[#EEFBFF] rounded-lg border border-[#0000FF]/20">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#0000FF]" />
              <span className="text-sm font-semibold text-[#0000FF]">{bundle.name} - {bundle.savings}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{recommendation.bundleAdvantage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ProductCategorySection({ 
  category, 
  recommendations,
  bundleAdvantage 
}: { 
  category: string; 
  recommendations: ProductRecommendation[];
  bundleAdvantage?: string;
}) {
  const Icon = CATEGORY_ICONS[category] || Zap;

  return (
    <div className="mb-8" data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#0000FF]/10 rounded-lg">
          <Icon className="w-6 h-6 text-[#0000FF]" />
        </div>
        <h2 
          className="text-xl font-bold text-[#0000FF]" 
          style={{ fontFamily: 'Archivo, sans-serif' }}
        >
          {category}
        </h2>
        <Badge variant="outline" className="ml-auto">
          {recommendations.length} recommendation{recommendations.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <ProductRecommendationCard 
            key={rec.id || idx} 
            recommendation={rec}
            showBundleAdvantage={idx === 0}
          />
        ))}
      </div>

      {bundleAdvantage && (
        <div className="mt-4 p-4 bg-[#EEFBFF] rounded-lg border-2 border-[#0000FF]">
          <p className="text-[#09080E]">
            💡 <strong>Bundle Advantage:</strong> {bundleAdvantage}
          </p>
        </div>
      )}
    </div>
  );
}
