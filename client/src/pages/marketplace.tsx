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
  Paperclip
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
      description: 'Build your foundation. Build a reliable foundation for attracting customers.',
      accentColor: 'orange',
      features: [
        { text: '5 team members', included: true },
        { text: '25 client accounts', included: true },
        { text: 'Digital IQ + Blueprint', included: true }
      ]
    },
    {
      id: 'advanced-plan',
      name: 'Advanced',
      icon: Settings,
      emoji: '⚙️',
      price: 299,
      priceMonthly: 310,
      tagline: 'Get Customers',
      description: 'Convert attention. AI automation + insights included.',
      accentColor: 'orange',
      features: [
        { text: '10 team members', included: true },
        { text: '100 client accounts', included: true },
        { text: 'AI automation + insights', included: true }
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
      description: 'Get Business. Unify your system.',
      accentColor: 'orange',
      features: [
        { text: '50 team members', included: true },
        { text: '500 client accounts', included: true },
        { text: 'Enterprise features', included: true }
      ]
    }
  ];

  // DIY Add-Ons
  const diyAddons: Addon[] = [
    {
      id: 'listings-addon',
      name: '/listings',
      icon: MapPin,
      emoji: '📍',
      price: 35,
      description: 'Manage your business listings',
      accentColor: 'blue',
      features: [
        'Profile sync (NAP, hours, site)',
        'Major directories + long-tail',
        'Duplicate suppression'
      ]
    },
    {
      id: 'inbox-addon',
      name: '/inbox',
      icon: MessageSquare,
      emoji: '📥',
      price: 35,
      description: 'Unified communications',
      accentColor: 'blue',
      features: [
        'Unified inbox',
        'Multi-channel support',
        'Team collaboration'
      ]
    },
    {
      id: 'livechat-addon',
      name: '/livechat',
      icon: MessageSquare,
      emoji: '💬',
      price: 35,
      description: 'Real-time customer chat',
      accentColor: 'blue',
      features: [
        'Live chat widget',
        'Real-time responses',
        'Chat history'
      ]
    },
    {
      id: 'content-addon',
      name: '/content',
      icon: MessageSquare,
      emoji: '📱',
      price: 35,
      description: 'Social content management',
      accentColor: 'blue',
      features: [
        'Multi-platform posting',
        'Content calendar',
        'Analytics'
      ]
    }
  ];

  // MSP Services
  const mspServices: Addon[] = [
    {
      id: 'standard-msp',
      name: 'Standard MSP',
      icon: Wrench,
      emoji: '🛠️',
      price: 313,
      description: 'We do it for you. 10 managed hours included.',
      accentColor: 'purple',
      features: [
        '10 managed hours',
        '$69/hr additional',
        'Dedicated support',
        'Professional management'
      ]
    },
    {
      id: 'premium-msp',
      name: 'Premium MSP',
      icon: Paperclip,
      emoji: '🧷',
      price: 625,
      description: 'Premium managed services. 20 managed hours included.',
      accentColor: 'purple',
      features: [
        '20 managed hours',
        '$56/hr additional',
        'Priority support',
        'Advanced management'
      ]
    }
  ];

  // À La Carte Services
  const alaCarteServices: Addon[] = [
    {
      id: 'reputation-management',
      name: 'Reputation Management',
      icon: Star,
      emoji: '⭐',
      price: 15,
      priceNote: '/location',
      description: 'Monitor & respond across platforms',
      accentColor: 'red',
      features: [
        'AI-assisted responses',
        'Alerts & tagging',
        'Monthly reporting'
      ]
    },
    {
      id: 'social-posting',
      name: 'Social Media Posting',
      icon: MessageSquare,
      emoji: '📱',
      price: 25,
      priceNote: '/location/mo',
      description: 'Full-service content creation',
      accentColor: 'orange',
      features: [
        'Branded content',
        'Cross-channel publishing',
        'Analytics'
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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Path to Growth
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three ways to grow your digital presence: Do It Yourself, Managed Services, or Pick What You Need
            </p>
          </div>

          {/* Three Card Menu - Pathway Selection */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {/* DIY Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-center">
                <div className="text-5xl mb-4">💡</div>
                <h3 className="text-2xl font-bold mb-3">Do It Yourself (DIY)</h3>
                <p className="text-blue-100 text-sm mb-6">Full control of your digital presence with AI-powered tools & 4 Commverse apps</p>
                <div className="text-4xl font-bold mb-2">$99+</div>
                <div className="text-blue-100 text-sm">per month</div>
              </div>
            </Card>

            {/* MSP Card */}
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-4 border-white rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-center">
                <div className="text-5xl mb-4">👑</div>
                <h3 className="text-2xl font-bold mb-3">Managed Services (MSP)</h3>
                <p className="text-purple-100 text-sm mb-6">We do it for you - Expert team handles everything</p>
                <div className="text-4xl font-bold mb-2">$313+</div>
                <div className="text-purple-100 text-sm">per month</div>
              </div>
            </Card>

            {/* À La Carte Card */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-3">À La Carte</h3>
                <p className="text-green-100 text-sm mb-6">Pick what you need - No base plan required (EXCEPT AI COACH PRO DIY ONLY)</p>
                <div className="text-4xl font-bold mb-2">Custom</div>
                <div className="text-green-100 text-sm">pricing</div>
              </div>
            </Card>
          </div>

          {/* Journey Explanation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How This Works</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-2">Choose Your Base Plan (Required for DIY & MSP)</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    All DIY & MSP customers start with a base Commverse Plan (Digital IQ & Blueprint). This is REQUIRED. Then add Apps (the /send, /inbox, /livechat, /content Bundle – ALL or individually).
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-2">Add Optional Commverse Apps (All Customers)</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bundle all 4 apps together (/send, /inbox, /livechat, /content) for $119/mo and SAVE in bundle, or purchase individually at $35 each. These integrate with your base plan seamlessly. These can also be purchased separately without a base plan through ALÀ CARTE.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg mb-2">Choose Your Service Level</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>DIY:</strong> You manage everything with our tools<br/>
                    <strong>MSP:</strong> Our team manages it for you (Standard $313/mo or Premium $625/mo)<br/>
                    <strong>À La Carte:</strong> Pick specific services without a base plan (Reputation Management, Social Posting, etc.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* DIY Plans Section */}
        <div className="mb-16 mt-12">
          <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">Choose Your Base Plan (Required)</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Commverse Base Plans • Digital IQ & Blueprint</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl">
            These are REQUIRED for DIY customers. Includes Digital IQ Assessment + Blueprint. Then add Apps (Bundle or Individual).
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {diyPlans.map((plan) => {
              const colors = getAccentColorClasses(plan.accentColor);
              const isInCart = cart.some(item => item.id === plan.id);

              return (
                <Card key={plan.id} 
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-6 relative overflow-hidden shadow-lg`}>
                  <div className="inline-flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span className="text-2xl">{plan.emoji}</span>
                    <span className="text-white">{plan.name}</span>
                  </div>

                  <div className="text-4xl font-extrabold mb-2 text-white">
                    ${plan.price}<span className="text-xl">/mo</span>
                  </div>
                  <p className="text-white/90 text-sm mb-6">{plan.description}</p>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white text-sm">
                        <span className="h-6 w-6 rounded flex items-center justify-center text-sm font-black bg-white text-black flex-shrink-0">
                          ✓
                        </span>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => addToCart(plan, 'plan', 'annual')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}>
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
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12"></div>

        {/* Commverse Apps Bundle */}
        <div className="mb-16">
          <div className="text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">+ Add Commverse Apps (Optional)</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Native Communication Apps</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl">
            Bundle all 4 apps for $119/mo and SAVE, or purchase individually. These work with or without a base plan.
          </p>

          {/* Bundle Option First */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-4 border-white rounded-2xl p-8 mb-8 max-w-2xl mx-auto shadow-xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-2xl font-bold px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                <span className="text-3xl">📦</span>
                <span className="text-white">All-in-One Bundle</span>
              </div>
              <div className="text-5xl font-extrabold mb-2 text-white">$119/mo</div>
              <div className="text-lg text-white/90 mb-4">All 4 apps: /send + /inbox + /livechat + /content</div>
              <div className="text-2xl text-green-200 font-bold mb-6">💰 Save $21/month!</div>
              <Button 
                onClick={() => addToCart({ id: 'bundle', name: 'Commverse Bundle', price: 119, icon: MessageSquare, description: 'All 4 apps', features: [], accentColor: 'purple', emoji: '📦' }, 'addon')}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-lg text-lg py-6">
                <Plus className="w-5 h-5 mr-2" />
                Add Bundle to Cart
              </Button>
            </div>
          </Card>

          {/* Individual Apps */}
          <div className="grid md:grid-cols-4 gap-6">
            {diyAddons.map((addon) => {
              const colors = getAccentColorClasses(addon.accentColor);
              const isInCart = cart.some(item => item.id === addon.id);

              return (
                <Card key={addon.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-xl p-5 shadow-lg`}>
                  <div className="inline-flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                    <span>{addon.emoji}</span>
                    <span className="text-white">{addon.name}</span>
                  </div>
                  <div className="text-3xl font-extrabold mb-2 text-white">${addon.price}/mo</div>
                  <p className="text-white/90 text-xs mb-4">{addon.description}</p>
                  <div className="text-xs text-green-200 mb-4">Save in bundle</div>
                  <Button 
                    onClick={() => addToCart(addon, 'addon')}
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg text-sm ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12"></div>

        {/* MSP Services */}
        <div className="mb-16">
          <div className="text-purple-600 dark:text-purple-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">Managed Service Packages</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">We Do It For You</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl">
            Professional team manages your digital presence. Includes managed hours and dedicated support.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mspServices.map((service) => {
              const colors = getAccentColorClasses(service.accentColor);
              const isInCart = cart.some(item => item.id === service.id);

              return (
                <Card key={service.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-6 shadow-lg`}>
                  <div className="inline-flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span className="text-2xl">{service.emoji}</span>
                    <span className="text-white">{service.name}</span>
                  </div>
                  <div className="text-4xl font-extrabold mb-2 text-white">${service.price}/mo</div>
                  <p className="text-white/90 text-sm mb-6">{service.description}</p>
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
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added
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
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12"></div>

        {/* À La Carte Services */}
        <div className="mb-16">
          <div className="text-green-600 dark:text-green-400 text-xs font-bold tracking-[0.18em] uppercase mb-2">À La Carte Services</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Pick What You Need</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl">
            No base plan required. Choose specific managed services. (EXCEPT AI COACH PRO - DIY ONLY requires base plan)
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {alaCarteServices.map((service) => {
              const colors = getAccentColorClasses(service.accentColor);
              const isInCart = cart.some(item => item.id === service.id);

              return (
                <Card key={service.id}
                      className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-6 shadow-lg`}>
                  <div className="inline-flex items-center gap-2 text-lg font-bold px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <span className="text-2xl">{service.emoji}</span>
                    <span className="text-white">{service.name}</span>
                  </div>
                  <div className="text-4xl font-extrabold mb-1 text-white">
                    ${service.price}<span className="text-lg">{service.priceNote}</span>
                  </div>
                  <p className="text-white/90 text-sm mb-6">{service.description}</p>
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
                    className={`w-full bg-white text-black hover:bg-gray-100 font-bold rounded-lg ${isInCart ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}>
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Added
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
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-2xl z-40 flex items-center gap-2">
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
              <button onClick={() => setIsCartOpen(false)}>
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
                  <div key={item.id} className="flex items-start gap-3 pb-4 border-b">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        ${item.price}/mo
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.id, -1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.id, 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600"
                        onClick={() => removeFromCart(item.id)}>
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
                <span className="text-2xl font-bold">
                  ${cartTotal.toFixed(2)}/mo
                </span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700">
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