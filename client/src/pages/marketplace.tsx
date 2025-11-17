
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
  Wrench,
  Paperclip
} from "lucide-react";
import { useLocation } from "wouter";
import commverseBundle from "@assets/logos and wordmarks/: commverse bundle logo.png";

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

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('marketplace_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('marketplace_cart');
    }
  }, [cart]);

  const diyPlans: Plan[] = [
    {
      id: 'start-plan',
      name: 'Start',
      icon: Lightbulb,
      emoji: '💡',
      price: 99,
      priceMonthly: 124,
      tagline: 'Get Found',
      description: 'Build your foundation',
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
      description: 'Convert attention',
      accentColor: 'blue',
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
      description: 'Unified system',
      accentColor: 'green',
      features: [
        { text: '50 team members', included: true },
        { text: '500 client accounts', included: true },
        { text: 'Enterprise features', included: true }
      ]
    }
  ];

  const diyAddons: Addon[] = [
    {
      id: 'send-addon',
      name: '/send',
      icon: MessageSquare,
      emoji: '📧',
      price: 35,
      description: 'Email & SMS marketing automation',
      accentColor: 'blue',
      features: [
        'Unlimited email campaigns',
        'SMS messaging included',
        'Contact management',
        'GDPR compliant'
      ]
    },
    {
      id: 'inbox-addon',
      name: '/inbox',
      icon: MessageSquare,
      emoji: '📥',
      price: 35,
      description: 'Unified communications hub',
      accentColor: 'blue',
      features: [
        'Multi-channel inbox',
        'Email, SMS, WhatsApp',
        'Real-time messaging',
        'Team collaboration'
      ]
    },
    {
      id: 'livechat-addon',
      name: '/livechat',
      icon: MessageSquare,
      emoji: '💬',
      price: 35,
      description: 'Website live chat widget',
      accentColor: 'purple',
      features: [
        'Real-time chat',
        'Session persistence',
        'Conversation history',
        'Customizable design'
      ]
    },
    {
      id: 'content-addon',
      name: '/content',
      icon: MessageSquare,
      emoji: '📱',
      price: 35,
      description: 'Social content management',
      accentColor: 'pink',
      features: [
        'Multi-platform posting',
        'Content calendar',
        'AI caption suggestions',
        'Analytics dashboard'
      ]
    }
  ];


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
        'Review alerts & tagging',
        'Sentiment analysis',
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
        'Branded content creation',
        'Cross-channel publishing',
        'Performance analytics',
        'Monthly strategy review'
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
    const colorMap: Record<string, { gradient: string; border: string; text: string; bg: string }> = {
      blue: { 
        gradient: 'from-[#0057FF] to-[#0000FF]', 
        border: 'border-[#0057FF]',
        text: 'text-[#0057FF]',
        bg: 'bg-[#0057FF]'
      },
      purple: { 
        gradient: 'from-[#660099] to-[#8000FF]', 
        border: 'border-[#660099]',
        text: 'text-[#660099]',
        bg: 'bg-[#660099]'
      },
      green: { 
        gradient: 'from-[#84D71A] to-[#00FF40]', 
        border: 'border-[#84D71A]',
        text: 'text-[#84D71A]',
        bg: 'bg-[#84D71A]'
      },
      red: { 
        gradient: 'from-[#FF0040] to-[#E91E8C]', 
        border: 'border-[#FF0040]',
        text: 'text-[#FF0040]',
        bg: 'bg-[#FF0040]'
      },
      orange: { 
        gradient: 'from-[#F79248] to-[#FFA500]', 
        border: 'border-[#F79248]',
        text: 'text-[#F79248]',
        bg: 'bg-[#F79248]'
      },
      pink: { 
        gradient: 'from-[#E91E8C] to-[#FF96DD]', 
        border: 'border-[#E91E8C]',
        text: 'text-[#E91E8C]',
        bg: 'bg-[#E91E8C]'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ color: '#09080E' }}>
            Choose Your Path to Growth
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Three ways to grow: <strong>Do It Yourself</strong>, <strong>Managed Services</strong>, or <strong>Pick What You Need</strong>
          </p>

          {/* Three Pathway Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <Card className="bg-white border-2 rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105" style={{ borderColor: '#F79248' }}>
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#09080E' }}>Do It Yourself (DIY)</h3>
              <p className="text-sm text-gray-600 mb-6">Full control with AI-powered tools & 4 Commverse apps</p>
              <div className="text-5xl font-black mb-2" style={{ color: '#F79248' }}>$99+</div>
              <div className="text-gray-600 text-sm">per month</div>
            </Card>

            <Card className="bg-white border-2 rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105" style={{ borderColor: '#0057FF' }}>
              <div className="text-6xl mb-4">👑</div>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#09080E' }}>Managed Services (MSP)</h3>
              <p className="text-sm text-gray-600 mb-6">We do it for you - Expert team handles everything</p>
              <div className="text-5xl font-black mb-2" style={{ color: '#0057FF' }}>$299</div>
              <div className="text-gray-600 text-sm">per month</div>
            </Card>

            <Card className="bg-white border-2 rounded-lg p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105" style={{ borderColor: '#84D71A' }}>
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-black mb-3" style={{ color: '#09080E' }}>À La Carte</h3>
              <p className="text-sm text-gray-600 mb-6">Pick what you need - No base plan required</p>
              <div className="text-5xl font-black mb-2" style={{ color: '#84D71A' }}>Custom</div>
              <div className="text-gray-600 text-sm">pricing</div>
            </Card>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl p-8 max-w-5xl mx-auto border-2" style={{ borderColor: '#09080E' }}>
            <h3 className="text-3xl font-black mb-8" style={{ color: '#09080E' }}>How This Works</h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0000FF] to-[#4D5CFF] text-white flex items-center justify-center font-black text-xl mb-4">1</div>
                <h4 className="font-black text-lg mb-2" style={{ color: '#09080E' }}>Choose Your Base Plan</h4>
                <p className="text-sm text-gray-600">All DIY & MSP customers start with a Base Plan powered by Synup (Digital IQ & Blueprint). This is REQUIRED.</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8000FF] to-[#B566FF] text-white flex items-center justify-center font-black text-xl mb-4">2</div>
                <h4 className="font-black text-lg mb-2" style={{ color: '#09080E' }}>Add Commverse Apps</h4>
                <p className="text-sm text-gray-600">Then add Commverse - the /send, /inbox, /livechat, /content Bundle (ALL or individually). Save money by bundling!</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF40] to-[#7DFFB2] text-white flex items-center justify-center font-black text-xl mb-4">3</div>
                <h4 className="font-black text-lg mb-2" style={{ color: '#09080E' }}>Choose Service Level</h4>
                <p className="text-sm text-gray-600"><strong>DIY:</strong> You manage. <strong>MSP:</strong> We manage. <strong>À La Carte:</strong> Pick specific services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        
        {/* DIY Section */}
        <div className="mb-20 mt-16">
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-[#0057FF] to-[#4D5CFF] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              Choose Your Base Plan (Required)
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: '#09080E' }}>
              Base Plans • Digital IQ & Blueprint
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl">
              These are <span className="font-black" style={{ color: '#F79248' }}>REQUIRED</span> for DIY customers. Includes Digital IQ Assessment + Blueprint. Then add Commverse Apps (Bundle or Individual).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {diyPlans.map((plan) => {
              const colors = getAccentColorClasses(plan.accentColor);
              const isInCart = cart.some(item => item.id === plan.id);

              return (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-3xl p-8 shadow-2xl h-full flex flex-col`}>
                    <div className="inline-flex items-center gap-3 text-xl font-black px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6 self-start">
                      <span className="text-3xl">{plan.emoji}</span>
                      <span className="text-white">{plan.name}</span>
                    </div>

                    <div className="text-5xl font-black mb-3 text-white">
                      ${plan.price}<span className="text-2xl">/mo</span>
                    </div>
                    <div className="text-xl font-bold text-white/90 mb-2">{plan.tagline}</div>
                    <p className="text-white/80 text-sm mb-8">{plan.description}</p>

                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white">
                          <span className="h-7 w-7 rounded-lg flex items-center justify-center text-lg font-black bg-white" style={{ color: '#09080E' }}>
                            ✓
                          </span>
                          <span className="text-sm font-medium">{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      onClick={() => addToCart(plan, 'plan', 'annual')}
                      className={`w-full font-black rounded-xl py-6 text-lg transition-all ${isInCart ? 'bg-[#00FF40] hover:bg-[#00CC33]' : 'bg-white hover:bg-gray-100'}`}
                      style={{ color: isInCart ? '#09080E' : '#09080E' }}>
                      {isInCart ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        'Select Plan'
                      )}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Transition Copy */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gray-100 to-white border-2 rounded-2xl px-8 py-6 max-w-3xl" style={{ borderColor: '#09080E' }}>
            <p className="text-lg font-medium" style={{ color: '#09080E' }}>
              Now that you've chosen your foundation, let's add the <span className="font-black" style={{ color: '#8000FF' }}>communication tools</span> that will help you connect with customers across every channel.
            </p>
          </div>
        </div>

        {/* Commverse Apps Bundle */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-[#8000FF] to-[#B566FF] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              + Add Commverse Apps (Optional)
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: '#09080E' }}>
              Commverse: Native Communication Apps
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl">
              Bundle all 4 Commverse apps for <span className="font-black" style={{ color: '#00FF40' }}>$119/mo and SAVE $21</span>, or purchase individually. These work with or without a base plan.
            </p>
          </div>

          {/* Bundle Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-br from-[#8000FF] to-[#B566FF] border-4 border-white rounded-3xl p-10 max-w-3xl mx-auto shadow-2xl">
              <div className="text-center">
                <img src={commverseBundle} alt="Commverse Bundle" className="h-24 w-auto mx-auto mb-6" />
                <div className="inline-flex items-center gap-3 text-2xl font-black px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <span className="text-white">Commverse Bundle</span>
                </div>
                <div className="text-6xl font-black mb-3 text-white">$119/mo</div>
                <div className="text-xl text-white/90 mb-4">All 4 apps: /send + /inbox + /livechat + /content</div>
                <div className="text-3xl font-black mb-8" style={{ color: '#00FF40' }}>💰 Save $21/month!</div>
                <Button 
                  onClick={() => addToCart({ id: 'bundle', name: 'Commverse Bundle', price: 119, icon: MessageSquare, description: 'All 4 apps', features: [], accentColor: 'purple', emoji: '📦' }, 'addon')}
                  className="bg-white font-black rounded-xl py-6 px-12 text-xl hover:bg-gray-100"
                  style={{ color: '#8000FF' }}>
                  <Plus className="w-6 h-6 mr-2" />
                  Add Bundle to Cart
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Individual Apps */}
          <div className="grid md:grid-cols-4 gap-6">
            {diyAddons.map((addon) => {
              const colors = getAccentColorClasses(addon.accentColor);
              const isInCart = cart.some(item => item.id === addon.id);

              return (
                <motion.div
                  key={addon.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-2xl p-6 shadow-xl h-full flex flex-col`}>
                    <div className="inline-flex items-center gap-2 text-base font-black px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 self-start">
                      <span className="text-2xl">{addon.emoji}</span>
                      <span className="text-white">{addon.name}</span>
                    </div>
                    <div className="text-4xl font-black mb-2 text-white">${addon.price}/mo</div>
                    <p className="text-white/80 text-xs mb-4 flex-grow">{addon.description}</p>
                    <div className="text-xs font-bold mb-4" style={{ color: '#00FF40' }}>Save in bundle</div>
                    <Button 
                      onClick={() => addToCart(addon, 'addon')}
                      className={`w-full font-black rounded-lg py-4 transition-all ${isInCart ? 'bg-[#00FF40] hover:bg-[#00CC33]' : 'bg-white hover:bg-gray-100'}`}
                      style={{ color: '#09080E' }}>
                      {isInCart ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Transition Copy */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gray-100 to-white border-2 rounded-2xl px-8 py-6 max-w-3xl" style={{ borderColor: '#09080E' }}>
            <p className="text-lg font-medium" style={{ color: '#09080E' }}>
              Already have the tools but need an <span className="font-black" style={{ color: '#8000FF' }}>expert team</span> to manage them? Let us handle everything while you focus on your business.
            </p>
          </div>
        </div>

        {/* MSP Services */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-[#8000FF] to-[#B566FF] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              Managed Service Packages
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: '#09080E' }}>
              We Do It For You
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl">
              Professional team manages your digital presence. Includes managed hours and dedicated support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mspServices.map((service) => {
              const colors = getAccentColorClasses(service.accentColor);
              const isInCart = cart.some(item => item.id === service.id);

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-3xl p-8 shadow-2xl h-full flex flex-col`}>
                    <div className="inline-flex items-center gap-3 text-xl font-black px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6 self-start">
                      <span className="text-3xl">{service.emoji}</span>
                      <span className="text-white">{service.name}</span>
                    </div>
                    <div className="text-5xl font-black mb-3 text-white">${service.price}/mo</div>
                    <p className="text-white/90 text-base mb-8 font-medium">{service.description}</p>
                    <ul className="space-y-4 mb-8 flex-grow">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white">
                          <span className="h-7 w-7 rounded-lg flex items-center justify-center text-lg font-black bg-white" style={{ color: '#09080E' }}>
                            ✓
                          </span>
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => addToCart(service, 'addon')}
                      className={`w-full font-black rounded-xl py-6 text-lg transition-all ${isInCart ? 'bg-[#00FF40] hover:bg-[#00CC33]' : 'bg-white hover:bg-gray-100'}`}
                      style={{ color: '#09080E' }}>
                      {isInCart ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Added
                        </>
                      ) : (
                        'Select Package'
                      )}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Transition Copy */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gray-100 to-white border-2 rounded-2xl px-8 py-6 max-w-3xl" style={{ borderColor: '#09080E' }}>
            <p className="text-lg font-medium" style={{ color: '#09080E' }}>
              Need just <span className="font-black" style={{ color: '#FF0040' }}>one specific service</span>? Pick exactly what you need - no base plan required.
            </p>
          </div>
        </div>

        {/* À La Carte Services */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="inline-block bg-gradient-to-r from-[#00FF40] to-[#7DFFB2] text-white text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              À La Carte Services
            </div>
            <h2 className="text-4xl font-black mb-3" style={{ color: '#09080E' }}>
              Pick What You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl">
              No base plan required. Choose specific managed services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {alaCarteServices.map((service) => {
              const colors = getAccentColorClasses(service.accentColor);
              const isInCart = cart.some(item => item.id === service.id);

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`bg-gradient-to-br ${colors.gradient} border-0 rounded-3xl p-8 shadow-2xl h-full flex flex-col`}>
                    <div className="inline-flex items-center gap-3 text-xl font-black px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6 self-start">
                      <span className="text-3xl">{service.emoji}</span>
                      <span className="text-white">{service.name}</span>
                    </div>
                    <div className="text-5xl font-black mb-1 text-white">
                      ${service.price}<span className="text-xl">{service.priceNote}</span>
                    </div>
                    <p className="text-white/90 text-base mb-8 font-medium">{service.description}</p>
                    <ul className="space-y-4 mb-8 flex-grow">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white">
                          <span className="h-7 w-7 rounded-lg flex items-center justify-center text-lg font-black bg-white" style={{ color: '#09080E' }}>
                            ✓
                          </span>
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => addToCart(service, 'addon')}
                      className={`w-full font-black rounded-xl py-6 text-lg transition-all ${isInCart ? 'bg-[#00FF40] hover:bg-[#00CC33]' : 'bg-white hover:bg-gray-100'}`}
                      style={{ color: '#09080E' }}>
                      {isInCart ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Added
                        </>
                      ) : (
                        'Select Service'
                      )}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cartItemCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 rounded-full p-5 shadow-2xl z-40 flex items-center gap-3 bg-gradient-to-br from-[#0000FF] to-[#4D5CFF] text-white font-black">
          <ShoppingCart className="w-6 h-6" />
          <Badge className="bg-white font-black" style={{ color: '#0000FF' }}>{cartItemCount}</Badge>
        </button>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full lg:w-96 bg-white shadow-2xl z-50 transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#09080E' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-xl font-black">Cart</h2>
                {cartItemCount > 0 && (
                  <Badge className="bg-white font-black" style={{ color: '#09080E' }}>{cartItemCount}</Badge>
                )}
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-white">
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
                      <div className="font-black" style={{ color: '#09080E' }}>{item.name}</div>
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
                      <span className="w-8 text-center font-black">{item.quantity}</span>
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
                        className="h-7 w-7 p-0"
                        style={{ color: '#FF0040' }}
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
                <span className="text-lg font-black" style={{ color: '#09080E' }}>Total</span>
                <span className="text-3xl font-black" style={{ color: '#09080E' }}>
                  ${cartTotal.toFixed(2)}/mo
                </span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[#0000FF] to-[#4D5CFF] hover:from-[#0000CC] hover:to-[#3D4CCC] text-white font-black py-6 rounded-xl text-lg">
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
