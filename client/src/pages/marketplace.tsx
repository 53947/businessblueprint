import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  X,
  Plus,
  Minus,
  Check,
  Lightbulb,
  Settings,
  Rocket,
  MapPin,
  Star,
  MessageSquare,
  Search,
  Wrench,
  Paperclip,
  Send,
  Inbox,
  MessageCircle,
  MessagesSquare
} from "lucide-react";
import { useLocation } from "wouter";


interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'plan' | 'addon';
  billingCycle?: 'monthly' | 'annual';
}

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  icon: any;
  price: number;
  priceMonthly: number;
  tagline: string;
  description: string;
  features: PlanFeature[];
  accentColor: string;
  emoji: string;
}

interface Addon {
  id: string;
  name: string;
  icon: any;
  price: number;
  description: string;
  features: string[];
  accentColor: string;
  emoji: string;
  priceNote?: string;
}

export default function MarketplacePage() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('marketplace_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('marketplace_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('marketplace_cart');
    }
  }, [cart]);

  // DIY Plans
  const diyPlans: Plan[] = [
    {
      id: 'start-plan',
      name: 'Start',
      icon: Lightbulb,
      emoji: '💡',
      price: 99,
      priceMonthly: 124,
      tagline: 'Get Found',
      description: 'Free Digital IQ + Blueprint. Build a reliable foundation for attracting customers.',
      accentColor: 'blue',
      features: [
        { text: 'Up to 5 team members', included: true },
        { text: 'Up to 25 client accounts', included: true },
        { text: 'Listings Management across Google, Apple Maps, Bing, Yelp, FB', included: true },
        { text: 'Reviews Management to monitor + respond', included: true },
        { text: 'Social Media Tools for scheduling + tracking', included: true },
        { text: 'Local SEO for map pack visibility + rank tracking', included: true },
        { text: 'Digital IQ Assessment + Blueprint', included: true },
        { text: 'AI Business Coach (pay as you use)', included: true }
      ]
    },
    {
      id: 'advanced-plan',
      name: 'Advanced',
      icon: Settings,
      emoji: '⚙️',
      price: 248,
      priceMonthly: 310,
      tagline: 'Get Customers',
      description: 'Automation + AI Coach included to convert attention into revenue.',
      accentColor: 'purple',
      features: [
        { text: 'Up to 10 team members', included: true },
        { text: 'Up to 100 client accounts', included: true },
        { text: 'Listings sync across 70+ directories', included: true },
        { text: 'Reviews AI reply drafts + sentiment tagging', included: true },
        { text: 'Social Automation smart calendar + insights', included: true },
        { text: 'Local SEO Tools keywords, competitors, on-page', included: true },
        { text: 'Digital IQ + Expanded Blueprint', included: true },
        { text: 'AI Business Coach (pay as you use)', included: true }
      ]
    },
    {
      id: 'scale-plan',
      name: 'Scale',
      icon: Rocket,
      emoji: '🚀',
      price: 999,
      priceMonthly: 1249,
      tagline: 'Get Business',
      description: 'Unify marketing, sales, payments, and retention on one intelligent system.',
      accentColor: 'green',
      features: [
        { text: 'Up to 50 team members', included: true },
        { text: 'Up to 500 client accounts', included: true },
        { text: 'Listings enterprise sync + reporting', included: true },
        { text: 'Reviews advanced automation + templates', included: true },
        { text: 'Social Suite collaboration + AI content planning', included: true },
        { text: 'Local SEO Suite national tracking + analytics', included: true },
        { text: 'Digital IQ + Blueprint integrated with CRM/automation', included: true },
        { text: 'AI Business Coach (pay as you use)', included: true }
      ]
    }
  ];

  // DIY Add-Ons
  const diyAddons: Addon[] = [
    {
      id: 'listings-addon',
      name: 'Listings',
      icon: MapPin,
      emoji: '📍',
      price: 44,
      description: 'Accurate profiles across directories, maps, and search engines.',
      accentColor: 'blue',
      features: [
        'Profile sync (NAP, hours, site)',
        'Major directories + long-tail',
        'Duplicate suppression',
        'Holiday hours, logos, photos',
        'Change monitoring + health report'
      ]
    },
    {
      id: 'reviews-pro-addon',
      name: 'Reviews (Pro)',
      icon: Star,
      emoji: '⭐',
      price: 25,
      description: 'Generate more reviews & respond faster.',
      accentColor: 'purple',
      features: [
        'SMS/email requests + QR',
        'Unified inbox (Google, FB, Yelp…)',
        'AI reply drafts + alerts',
        'Widgets + trend reports'
      ]
    },
    {
      id: 'reviews-gold-addon',
      name: 'Reviews (Gold)',
      icon: Star,
      emoji: '⭐',
      price: 63,
      description: 'Advanced insights and automation.',
      accentColor: 'red',
      features: [
        'Smart routing + win-back',
        'Response templates + guardrails',
        'Competitor benchmarking',
        'Multi-location roll-ups + compliance'
      ]
    },
    {
      id: 'content-management',
      name: 'Content Management',
      icon: MessageSquare,
      emoji: '📱',
      price: 50,
      description: 'Create, schedule & publish social content with AI assistance.',
      accentColor: 'pink',
      features: [
        '3 platforms (FB/IG/LinkedIn/X/Google) - pick favorites',
        'Visual calendar + drag-drop scheduling',
        'AI caption generator with tone control',
        'Media library with cloud storage (R2)',
        'Post analytics & performance tracking',
        'AI Coach integration'
      ]
    },
    {
      id: 'local-seo-addon',
      name: 'Local SEO',
      icon: Search,
      emoji: '🔎',
      price: 6,
      description: 'Climb (and stay) in the local 3-pack.',
      accentColor: 'green',
      features: [
        'Local keyword + map pack tracking',
        'Competitor comparison',
        'On-page checks + GBP tips',
        'Monthly scorecard + quick wins'
      ]
    }
  ];

  // MSP Add-Ons
  const mspAddons: Addon[] = [
    {
      id: 'reputation-management',
      name: 'Reputation Management',
      icon: Star,
      emoji: '⭐',
      price: 15,
      priceNote: 'per month',
      description: 'Per location pricing • Includes 50 responses/mo • +$2 each additional',
      accentColor: 'red',
      features: [
        'Monitor & respond across platforms',
        'AI-assisted responses (tone controls)',
        'Alerts, tagging, monthly reporting'
      ]
    },
    {
      id: 'content-management-msp',
      name: 'Social Media Posting',
      icon: MessageSquare,
      emoji: '📱',
      price: 80,
      priceNote: 'per month',
      description: 'Per location pricing • Full-service content creation & publishing',
      accentColor: 'pink',
      features: [
        'All 7 platforms (FB/IG/LinkedIn/X/Google/TikTok/Snapchat)',
        'Two-way Synup sync for listings integration',
        'Team collaboration & approval workflows',
        'Advanced analytics & reporting',
        'Priority AI Coach access',
        'Branded content library'
      ]
    }
  ];

  // AI Coach Add-Ons
  const aiCoachAddons: Addon[] = [
    {
      id: 'ai-coach-essential',
      name: 'AI Coach Essential',
      icon: Lightbulb,
      emoji: '🤖',
      price: 99,
      description: 'Pay-as-you-go AI guidance • For DIY customers',
      accentColor: 'blue',
      features: [
        'Core AI business guidance',
        'Automated task suggestions',
        'Basic progress tracking',
        'Standard response time',
        'Essential coaching features',
        'Pay only for what you use'
      ],
      priceNote: 'DIY pricing'
    },
    {
      id: 'ai-coach-essential-msp',
      name: 'AI Coach Essential',
      icon: Lightbulb,
      emoji: '🤖',
      price: 59,
      description: 'Pay-as-you-go AI guidance • For MSP customers',
      accentColor: 'blue',
      features: [
        'Core AI business guidance',
        'Automated task suggestions',
        'Basic progress tracking',
        'Standard response time',
        'Essential coaching features',
        'Pay only for what you use'
      ],
      priceNote: 'MSP pricing'
    },
    {
      id: 'ai-coach-pro',
      name: 'AI Coach Pro',
      icon: Rocket,
      emoji: '🚀',
      price: 99,
      description: 'Unlimited AI support • Advanced strategies',
      accentColor: 'purple',
      features: [
        'Unlimited personalized guidance',
        'Advanced step-by-step instructions',
        'Real-time progress analysis',
        'Priority AI responses',
        '24/7 availability',
        'Premium coaching algorithms',
        'Custom business strategies'
      ],
      priceNote: 'DIY only'
    }
  ];

  // Captaining Service
  const captainingService: Addon[] = [
    {
      id: 'captaining',
      name: 'Captaining',
      icon: Star,
      emoji: '⚓',
      price: 499,
      description: 'Expert strategic guidance & account management',
      accentColor: 'orange',
      features: [
        'Dedicated account strategist',
        'Monthly strategy sessions',
        'Quarterly business reviews',
        'Custom growth roadmap',
        'Priority support access',
        'Cross-platform optimization',
        'Performance analytics & reporting'
      ],
      priceNote: 'per month'
    }
  ];

  // MSP Packages
  const mspPackages: Addon[] = [
    {
      id: 'standard-msp',
      name: 'Standard MSP',
      icon: Wrench,
      emoji: '🛠️',
      price: 313,
      description: '10 managed hours • $69/hr additional',
      accentColor: 'blue',
      features: [
        'Initial response: P1 90m • P2 120m • P3 180m',
        'Service hours: 24×5',
        'Channels: Email + Phone',
        'Dedicated CSM + Knowledge Base',
        'Monthly analytics + quarterly audits',
        'GMB Support Assist (tickets, located-in fixes, pins)',
        'Listings/profile edits (SLA ~12h), posts 24h, suggest-edit rejection 48h',
        'Apple Business Connect updates'
      ]
    },
    {
      id: 'premium-msp',
      name: 'Premium MSP',
      icon: Paperclip,
      emoji: '🧷',
      price: 625,
      description: '20 managed hours • $56/hr additional',
      accentColor: 'purple',
      features: [
        'Initial response: P1 30m • P2 60m • P3 90m',
        'Service hours: 24×5 + dedicated service support 12×5',
        'Channels: Email + Chat + Phone',
        'Dedicated Slack channel + CSM',
        'Priority reporting + faster resolution queue',
        'All Standard features + proactive monitoring & priority QA'
      ]
    }
  ];

  const addToCart = (item: Plan | Addon, type: 'plan' | 'addon', billingCycle?: 'monthly' | 'annual') => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        type,
        billingCycle
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    localStorage.setItem('marketplace_cart', JSON.stringify(cart));
    setLocation('/marketplace/checkout');
  };

  const getAccentColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; checkBg: string; text: string }> = {
      blue: { 
        gradient: 'from-[#0000FF] to-[#4D5CFF]', 
        checkBg: 'bg-[#0000FF]',
        text: 'text-[#0000FF]'
      },
      purple: { 
        gradient: 'from-[#8000FF] to-[#B566FF]', 
        checkBg: 'bg-[#8000FF]',
        text: 'text-[#8000FF]'
      },
      green: { 
        gradient: 'from-[#00FF40] to-[#7DFFB2]', 
        checkBg: 'bg-[#00FF40]',
        text: 'text-[#00FF40]'
      },
      red: { 
        gradient: 'from-[#FF0040] to-[#FF6A85]', 
        checkBg: 'bg-[#FF0040]',
        text: 'text-[#FF0040]'
      },
      orange: { 
        gradient: 'from-[#F79248] to-[#FFB67A]', 
        checkBg: 'bg-[#F79248]',
        text: 'text-[#F79248]'
      },
      pink: { 
        gradient: 'from-[#E91E8C] to-[#FF66CC]', 
        checkBg: 'bg-[#E91E8C]',
        text: 'text-[#E91E8C]'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-2">
            <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-4" data-testid="text-marketplace-kicker">
              Unified Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-marketplace-title">
              Choose Your Path to Growth
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8" data-testid="text-marketplace-description">
              Self-service DIY tools or fully managed services. Build your perfect digital strategy.
            </p>
            
            {/* Customer Journey Explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-5xl mx-auto mb-8 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Your Journey to Success</h3>
              
              <div className="prose prose-sm max-w-none mb-6 text-gray-700 dark:text-gray-300">
                <p className="text-base leading-relaxed">
                  Think of <strong>Base Plans (DIY)</strong> as the core subscription that powers your platform account. Then if you want, <strong>ADD Commverse Apps</strong> (also known as "Native Apps") — these are the four integrated communication tools: <strong>/send</strong>, <strong>/inbox</strong>, <strong>/livechat</strong>, and <strong>/content</strong>. They live inside your base plan or MSP portal and work seamlessly together.
                </p>
                
                <p className="text-base leading-relaxed mt-4">
                  After choosing <strong>Base + Commverse Apps</strong>, you can add <strong>DIY Add-Ons</strong>: Think additional specialized tools EXCEPT Commverse apps (like Listings, Reviews, Social, Local SEO).
                </p>
                
                <p className="text-base leading-relaxed mt-4">
                  The <strong>MSP pathway</strong> is when you want expert help executing your digital strategy. You still have the Base Plan, Commverse Apps, and Add-Ons in your account — our team just manages them for you with white-glove service.
                </p>
                
                <p className="text-base leading-relaxed mt-4">
                  <strong>À La Carte</strong> means you pick individual pieces without a base plan subscription. Perfect if you only need one specific tool or want to test before committing.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 text-left">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Base Plan (Required)</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Start, Advanced, or Scale</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Add Commverse Apps</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">/send, /inbox, /livechat, /content</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Add DIY Tools</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Listings, Reviews, Social, SEO</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">OR</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Choose MSP or À La Carte</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">We manage it or pick individual pieces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pathway Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {/* DIY Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">💡</div>
                <h3 className="text-2xl font-bold mb-2">DIY</h3>
                <p className="text-blue-100 text-sm mb-4">Do It Yourself - Full control with powerful tools</p>
                <div className="text-3xl font-bold mb-1">$99+</div>
                <div className="text-blue-100 text-xs">per month</div>
              </div>
            </div>

            {/* MSP Card */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer border-4 border-white">
              <div className="text-center">
                <div className="text-4xl mb-3">👑</div>
                <h3 className="text-2xl font-bold mb-2">MSP</h3>
                <p className="text-purple-100 text-sm mb-4">Managed Service Provider - We do it for you</p>
                <div className="text-3xl font-bold mb-1">$313+</div>
                <div className="text-purple-100 text-xs">per month</div>
              </div>
            </div>

            {/* À La Carte Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-2xl font-bold mb-2">À La Carte</h3>
                <p className="text-green-100 text-sm mb-4">Pick exactly what you need</p>
                <div className="text-3xl font-bold mb-1">Custom</div>
                <div className="text-green-100 text-xs">pricing</div>
              </div>
            </div>
          </div>

          {/* Animated Journey Flow */}
          <div className="relative h-64 mb-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Foundation Card */}
              <motion.div
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute left-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 w-48"
              >
                <div className="text-blue-300 text-xs font-bold mb-2">STEP 1</div>
                <div className="text-white font-bold mb-1">Foundation</div>
                <div className="text-blue-200 text-xs">Start Plan + Listings</div>
              </motion.div>

              {/* Connecting Line 1 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute left-60 w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
              />

              {/* Growth Card */}
              <motion.div
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="absolute left-80 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4 w-48"
              >
                <div className="text-purple-300 text-xs font-bold mb-2">STEP 2</div>
                <div className="text-white font-bold mb-1">Growth</div>
                <div className="text-purple-200 text-xs">+ Reviews + Social</div>
              </motion.div>

              {/* Connecting Line 2 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="absolute left-[32rem] w-20 h-0.5 bg-gradient-to-r from-purple-400 to-green-400 origin-left"
              />

              {/* Scale Card */}
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.6 }}
                className="absolute right-8 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4 w-48"
              >
                <div className="text-green-300 text-xs font-bold mb-2">STEP 3</div>
                <div className="text-white font-bold mb-1">Scale</div>
                <div className="text-green-200 text-xs">+ Local SEO + AI Coach</div>
              </motion.div>

              {/* Or Choose MSP Overlay */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 3.6 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-md border-2 border-orange-400/50 rounded-2xl p-6 w-64 shadow-2xl"
              >
                <div className="text-orange-300 text-xs font-bold mb-2 text-center">OR SKIP THE STEPS</div>
                <div className="text-white font-bold text-lg mb-2 text-center">MSP Managed</div>
                <div className="text-orange-200 text-xs text-center">We handle everything for you</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* DIY Plans */}
        <div className="mb-16" data-testid="section-diy-plans">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">DIY Base Plans (Required)</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Start • Advanced • Scale</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-4xl">
            Choose your foundation plan first. All DIY add-ons below require one of these base subscriptions.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {diyPlans.map((plan) => {
              const colors = getAccentColorClasses(plan.accentColor);
              const isInCart = cart.some(item => item.id === plan.id);

              return (
                <Card key={plan.id} 
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                      data-testid={`card-plan-${plan.id}`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span>{plan.emoji}</span>
                    <span className="text-white">
                      {plan.name}
                    </span>
                  </div>

                  <div className="text-4xl font-extrabold mb-1 text-white" 
                       data-testid={`text-plan-price-${plan.id}`}>
                    ${plan.price}/mo
                  </div>
                  <div className="text-xs text-white/80 mb-4">
                    or ${plan.priceMonthly} billed monthly • Save 20% annually
                  </div>

                  <p className="text-white/90 text-sm mb-4">{plan.description}</p>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                        <span className={`h-5 w-5 rounded flex items-center justify-center text-xs font-black flex-shrink-0 ${feature.included ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                          {feature.included ? '✓' : '•'}
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(plan, 'plan', 'annual')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    data-testid={`button-add-${plan.id}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      'Select'
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* DIY Add-Ons */}
        <div className="mb-16" data-testid="section-diy-addons">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">DIY Add-Ons</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Self-Service Modules</h2>
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
            <p className="text-blue-200 text-sm">
              ⚠️ <strong>Note:</strong> Add-ons require an active DIY base plan (Start, Advanced, or Scale) subscription.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {diyAddons.map((addon) => {
              const colors = getAccentColorClasses(addon.accentColor);
              const isInCart = cart.some(item => item.id === addon.id);

              return (
                <Card key={addon.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                      data-testid={`card-addon-${addon.id}`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span>{addon.emoji}</span>
                    <span className="text-white">
                      {addon.name}
                    </span>
                  </div>

                  <div className="text-3xl font-extrabold mb-2 text-white"
                       data-testid={`text-addon-price-${addon.id}`}>
                    ${addon.price}/mo
                  </div>

                  <p className="text-white/90 text-sm mb-4">{addon.description}</p>

                  <ul className="space-y-2.5 mb-6">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                        <span className="h-5 w-5 rounded flex items-center justify-center text-xs font-black bg-white text-black flex-shrink-0">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(addon, 'addon')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    data-testid={`button-add-${addon.id}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* AI Coach Add-Ons */}
        <div className="mb-16" data-testid="section-ai-coach">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">AI Business Coach</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Intelligent Guidance • Pay As You Use</h2>
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
            <p className="text-blue-200 text-sm">
              ℹ️ Add to any DIY base plan for AI-powered guidance on your digital marketing journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {aiCoachAddons.map((addon) => {
              const colors = getAccentColorClasses(addon.accentColor);
              const isInCart = cart.some(item => item.id === addon.id);

              return (
                <Card key={addon.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                      data-testid={`card-ai-coach-${addon.id}`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span>{addon.emoji}</span>
                    <span className="text-white">
                      {addon.name}
                    </span>
                  </div>

                  <div className="text-3xl font-extrabold mb-1 text-white"
                       data-testid={`text-ai-coach-price-${addon.id}`}>
                    ${addon.price}/{addon.priceNote || 'mo'}
                  </div>
                  <div className="text-xs text-white/80 mb-4">{addon.description}</div>

                  <ul className="space-y-2.5 mb-6">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                        <span className="h-5 w-5 rounded flex items-center justify-center text-xs font-black bg-white text-black flex-shrink-0">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(addon, 'addon')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    data-testid={`button-add-${addon.id}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* Native Commverse Apps - After Add-ons */}
        <div className="mb-16" data-testid="section-commverse-apps">
          <div className="text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">+ Add Commverse Apps (Optional)</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Native Communication Apps</h2>
          <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4 mb-6">
            <p className="text-purple-200 text-sm">
              💡 <strong>Bundle & Save:</strong> Get all 4 Commverse apps together for $119/mo instead of $140/mo separately.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-6">
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <Send className="w-5 h-5" />
                <span className="text-white">/send</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Email & SMS marketing automation</div>
              <div className="text-xs text-green-200 mb-4">Save in bundle</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <Inbox className="w-5 h-5" />
                <span className="text-white">/inbox</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Unified communication hub</div>
              <div className="text-xs text-green-200 mb-4">Save in bundle</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <MessageCircle className="w-5 h-5" />
                <span className="text-white">/livechat</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Real-time live chat widget</div>
              <div className="text-xs text-green-200 mb-4">Save in bundle</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <MessagesSquare className="w-5 h-5" />
                <span className="text-white">/content</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Social content management</div>
              <div className="text-xs text-green-200 mb-4">Save in bundle</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>
          </div>

          {/* Bundle Option */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-4 border-white rounded-2xl p-6 relative overflow-hidden shadow-xl max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <span className="text-2xl">📦</span>
              <span className="text-white">All-in-One Bundle</span>
            </div>
            <div className="text-4xl font-extrabold mb-1 text-white">$119/mo</div>
            <div className="text-sm text-white/80 mb-4">All 4 apps: /send + /inbox + /livechat + /content</div>
            <div className="text-lg text-green-200 mb-6">💰 Save $21/month vs individual pricing!</div>
            <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Bundle to Cart
            </Button>
          </Card>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* MSP Pathway Section */}
        <div className="mb-16" data-testid="section-msp-pathway">
          <div className="text-orange-600 dark:text-orange-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">Managed Services Provided (MSP)</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">We Do It For You</h2>
          <div className="bg-orange-500/10 border border-orange-400/30 rounded-lg p-6 mb-8">
            <p className="text-orange-900 dark:text-orange-200 text-base leading-relaxed">
              <strong>MSP is for busy owners who want expert execution.</strong> You get all the same tools (Base Plan + Commverse Apps + Add-Ons), 
              but our professional team manages everything for you. Think of it as hiring a digital marketing department without the overhead.
            </p>
          </div>

          {/* MSP Packages */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MSP Service Tiers</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {mspPackages.map((pkg) => {
                const colors = getAccentColorClasses(pkg.accentColor);
                const isInCart = cart.some(item => item.id === pkg.id);

                return (
                  <Card key={pkg.id}
                        className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                        data-testid={`card-msp-package-${pkg.id}`}>
                    <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                      <span>{pkg.emoji}</span>
                      <span className="text-white">
                        {pkg.name}
                      </span>
                    </div>

                    <div className="text-3xl font-extrabold mb-1 text-white"
                         data-testid={`text-msp-package-price-${pkg.id}`}>
                      ${pkg.price}/mo
                    </div>
                    <div className="text-xs text-white/80 mb-4">{pkg.description}</div>

                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                          <span className="h-5 w-5 rounded flex items-center justify-center text-xs font-black bg-white text-black flex-shrink-0">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={() => addToCart(pkg, 'addon')}
                      className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                      data-testid={`button-add-${pkg.id}`}>
                      {isInCart ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Select Plan
                        </>
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* MSP Add-Ons */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MSP Managed Add-Ons</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These are fully managed by our expert team as part of your MSP package.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {mspAddons.map((addon) => {
                const colors = getAccentColorClasses(addon.accentColor);
                const isInCart = cart.some(item => item.id === addon.id);

                return (
                  <Card key={addon.id}
                        className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                        data-testid={`card-msp-addon-${addon.id}`}>
                    <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                      <span>{addon.emoji}</span>
                      <span className="text-white">
                        {addon.name}
                      </span>
                    </div>

                    <div className="text-3xl font-extrabold mb-1 text-white"
                         data-testid={`text-msp-addon-price-${addon.id}`}>
                      ${addon.price}/{addon.priceNote || 'mo'}
                    </div>
                    <div className="text-xs text-white/80 mb-4">{addon.description}</div>

                    <ul className="space-y-2.5 mb-6">
                      {addon.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                          <span className="h-5 w-5 rounded flex items-center justify-center text-xs font-black bg-white text-black flex-shrink-0">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={() => addToCart(addon, 'addon')}
                      className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                      data-testid={`button-add-${addon.id}`}>
                      {isInCart ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Captaining Service */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Premium Captaining Service</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Strategic account management and expert guidance for businesses that want a dedicated partner.
            </p>
            <div className="max-w-2xl mx-auto">
              {captainingService.map((service) => {
                const colors = getAccentColorClasses(service.accentColor);
                const isInCart = cart.some(item => item.id === service.id);

                return (
                  <Card key={service.id}
                        className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-6 relative overflow-hidden shadow-lg`}
                        data-testid={`card-captaining-${service.id}`}>
                    <div className="inline-flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                      <span className="text-2xl">{service.emoji}</span>
                      <span className="text-white">
                        {service.name}
                      </span>
                    </div>

                    <div className="text-4xl font-extrabold mb-1 text-white"
                         data-testid={`text-captaining-price-${service.id}`}>
                      ${service.price}/{service.priceNote || 'mo'}
                    </div>
                    <div className="text-sm text-white/80 mb-6">{service.description}</div>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white text-sm">
                          <span className="h-6 w-6 rounded flex items-center justify-center text-sm font-black bg-white text-black flex-shrink-0">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={() => addToCart(service, 'addon')}
                      className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                      data-testid={`button-add-${service.id}`}>
                      {isInCart ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* À La Carte Section */}
        <div className="mb-16" data-testid="section-a-la-carte">
          <div className="text-green-600 dark:text-green-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">À La Carte Marketplace</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Pick What You Need</h2>
          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-6 mb-8">
            <p className="text-green-900 dark:text-green-200 text-base leading-relaxed">
              <strong>Not ready for a full subscription?</strong> No problem. Purchase individual tools and services à la carte. 
              Perfect for testing specific features or if you only need one piece of the puzzle right now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Individual Commverse Apps À La Carte */}
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 border-0 rounded-2xl p-5 shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <Send className="w-5 h-5" />
                <span className="text-white">/send</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Email & SMS marketing automation</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl p-5 shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <Inbox className="w-5 h-5" />
                <span className="text-white">/inbox</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Unified communication hub</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl p-5 shadow-lg">
              <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <MessageCircle className="w-5 h-5" />
                <span className="text-white">/livechat</span>
              </div>
              <div className="text-3xl font-extrabold mb-1 text-white">$35/mo</div>
              <div className="text-xs text-white/80 mb-4">Real-time live chat widget</div>
              <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                <Plus className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </Card>

            {/* Individual DIY Add-Ons À La Carte */}
            {diyAddons.slice(0, 3).map((addon) => {
              const colors = getAccentColorClasses(addon.accentColor);
              
              return (
                <Card key={addon.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 shadow-lg`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span>{addon.emoji}</span>
                    <span className="text-white">{addon.name}</span>
                  </div>

                  <div className="text-3xl font-extrabold mb-1 text-white">
                    ${addon.price}/mo
                  </div>
                  <div className="text-xs text-white/80 mb-4">{addon.description}</div>

                  <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm">
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* Legacy: MSP Add-Ons (keeping for backwards compatibility) */}
        <div className="mb-16" data-testid="section-msp-addons">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">MSP Add-Ons</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Managed by Our Team</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {mspAddons.map((addon) => {
              const colors = getAccentColorClasses(addon.accentColor);
              const isInCart = cart.some(item => item.id === addon.id);

              return (
                <Card key={addon.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                      data-testid={`card-msp-addon-${addon.id}`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span>{addon.emoji}</span>
                    <span className="text-white">
                      {addon.name}
                    </span>
                  </div>

                  <div className="text-3xl font-extrabold mb-1 text-white"
                       data-testid={`text-msp-addon-price-${addon.id}`}>
                    ${addon.price}/{addon.priceNote || 'mo'}
                  </div>
                  <div className="text-xs text-white/80 mb-4">{addon.description}</div>

                  <ul className="space-y-2.5 mb-6">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                        <span className="h-5 w-5 rounded flex items-center justify-center text-xs font-black bg-white text-black flex-shrink-0">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(addon, 'addon')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    data-testid={`button-add-${addon.id}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* Captaining Service */}
        <div className="mb-16" data-testid="section-captaining">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">Premium Service</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Captaining • Strategic Account Management</h2>

          <div className="max-w-2xl mx-auto">
            {captainingService.map((service) => {
              const colors = getAccentColorClasses(service.accentColor);
              const isInCart = cart.some(item => item.id === service.id);

              return (
                <Card key={service.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-6 relative overflow-hidden shadow-lg`}
                      data-testid={`card-captaining-${service.id}`}>
                  <div className="inline-flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span className="text-2xl">{service.emoji}</span>
                    <span className="text-white">
                      {service.name}
                    </span>
                  </div>

                  <div className="text-4xl font-extrabold mb-1 text-white"
                       data-testid={`text-captaining-price-${service.id}`}>
                    ${service.price}/{service.priceNote || 'mo'}
                  </div>
                  <div className="text-sm text-white/80 mb-6">{service.description}</div>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white text-sm">
                        <span className="h-6 w-6 rounded flex items-center justify-center text-sm font-black bg-white text-black flex-shrink-0">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(service, 'addon')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    data-testid={`button-add-${service.id}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* MSP Packages */}
        <div className="mb-16" data-testid="section-msp-packages">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">MSP Packages</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Managed Service Tiers (+25% applied)</h2>

          <div className="grid md:grid-cols-2 gap-5">
            {mspPackages.map((pkg) => {
              const colors = getAccentColorClasses(pkg.accentColor);
              const isInCart = cart.some(item => item.id === pkg.id);

              return (
                <Card key={pkg.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-5 relative overflow-hidden shadow-lg`}
                      data-testid={`card-msp-package-${pkg.id}`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span>{pkg.emoji}</span>
                    <span className="text-white">
                      {pkg.name}
                    </span>
                  </div>

                  <div className="text-3xl font-extrabold mb-1 text-white"
                       data-testid={`text-msp-package-price-${pkg.id}`}>
                    ${pkg.price}/mo
                  </div>
                  <div className="text-xs text-white/80 mb-4">{pkg.description}</div>

                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-white text-sm">
                        <span className="h-5 w-5 rounded flex items-center justify-center text-xs font-black bg-white text-black flex-shrink-0">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(pkg, 'addon')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                    data-testid={`button-add-${pkg.id}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-2xl z-40 flex items-center gap-2"
          data-testid="button-cart-mobile">
          <ShoppingCart className="w-6 h-6" />
          <Badge className="bg-white text-blue-600">{cartItemCount}</Badge>
        </button>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full lg:w-96 bg-white shadow-2xl z-50 transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-xl font-bold">Cart</h2>
                {cartItemCount > 0 && (
                  <Badge variant="secondary">{cartItemCount}</Badge>
                )}
              </div>
              <button onClick={() => setIsCartOpen(false)} data-testid="button-close-cart">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 pb-4 border-b" data-testid={`cart-item-${item.id}`}>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        ${item.price}/{item.billingCycle === 'annual' ? 'mo (annual)' : 'mo'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.id, -1)}
                        data-testid={`button-decrease-${item.id}`}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.id, 1)}
                        data-testid={`button-increase-${item.id}`}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600"
                        onClick={() => removeFromCart(item.id)}
                        data-testid={`button-remove-${item.id}`}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold" data-testid="text-cart-total">
                  ${cartTotal.toFixed(2)}/mo
                </span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700"
                data-testid="button-checkout">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}