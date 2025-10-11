import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Package, 
  Brain, 
  Ship, 
  MapPin, 
  Building, 
  Headphones,
  Mail,
  MessageSquare,
  Inbox as InboxIcon,
  X,
  Plus,
  Minus,
  Check
} from "lucide-react";
import { useLocation } from "wouter";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'app' | 'addon';
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  color: string;
  type: 'app' | 'addon' | 'bundle';
  category: string;
  badge?: string;
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

  // Product catalog
  const products: Product[] = [
    // Commverse Bundle
    {
      id: 'commverse-bundle',
      name: 'Commverse Complete Bundle',
      description: 'All three communication apps: /send, /livechat, and /inbox with cross-app analytics',
      price: 75,
      icon: Package,
      color: 'purple',
      type: 'bundle',
      category: 'commverse',
      badge: 'Save $30'
    },
    // Commverse Individual Apps
    {
      id: 'send-app',
      name: '/send',
      description: 'Email & SMS marketing platform with unified campaigns',
      price: 35,
      icon: Mail,
      color: 'yellow',
      type: 'app',
      category: 'commverse'
    },
    {
      id: 'livechat-app',
      name: '/livechat',
      description: 'Website live chat widget for real-time customer engagement',
      price: 35,
      icon: MessageSquare,
      color: 'purple',
      type: 'app',
      category: 'commverse'
    },
    {
      id: 'inbox-app',
      name: '/inbox',
      description: 'Unified inbox for 8 channels including email, SMS, and social media',
      price: 35,
      icon: InboxIcon,
      color: 'blue',
      type: 'app',
      category: 'commverse'
    },
    // Coaching & Growth
    {
      id: 'ai-coach-essential',
      name: 'AI Business Coach - Essential',
      description: 'Smart AI guidance with automated task suggestions and basic progress tracking',
      price: 99,
      icon: Brain,
      color: 'blue',
      type: 'addon',
      category: 'coaching',
      badge: 'Starter Plan'
    },
    {
      id: 'ai-coach-pro',
      name: 'AI Business Coach - Pro',
      description: 'Unlimited personalized AI guidance with advanced strategies and 24/7 availability',
      price: 59.99,
      icon: Brain,
      color: 'purple',
      type: 'addon',
      category: 'coaching',
      badge: 'Higher Tiers'
    },
    {
      id: 'captain-journey',
      name: 'Captain Your Journey',
      description: 'Personal business coach with weekly 1-on-1 sessions, custom strategies, and accountability',
      price: 249,
      icon: Ship,
      color: 'orange',
      type: 'addon',
      category: 'coaching'
    },
    // Business Expansion
    {
      id: 'locations-10',
      name: 'Additional 10 Locations',
      description: 'Expand your listings management to 10 more business locations',
      price: 49,
      icon: MapPin,
      color: 'green',
      type: 'addon',
      category: 'expansion'
    },
    {
      id: 'locations-50',
      name: 'Additional 50 Locations',
      description: 'Expand your listings management to 50 more business locations',
      price: 199,
      icon: Building,
      color: 'green',
      type: 'addon',
      category: 'expansion'
    },
    // Support
    {
      id: 'priority-support',
      name: 'Priority Support Upgrade',
      description: 'Upgrade to 1-hour response time support with dedicated phone line',
      price: 99,
      icon: Headphones,
      color: 'red',
      type: 'addon',
      category: 'support'
    }
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        type: product.type === 'bundle' ? 'app' : product.type
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // Save cart to localStorage
    localStorage.setItem('marketplace_cart', JSON.stringify(cart));
    // Navigate to checkout
    setLocation('/marketplace/checkout');
  };

  const getCategoryProducts = (category: string) => 
    products.filter(p => p.category === category);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-marketplace-title">
              À La Carte Marketplace
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-marketplace-description">
              Build your perfect digital toolkit. Choose individual apps and services or save with bundles.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Products */}
          <div className="flex-1">
            {/* Commverse Section */}
            <div className="mb-16" data-testid="section-commverse">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Commverse Communication Apps</h2>
                <p className="text-gray-600">
                  Three powerful apps that work autonomously but are stronger together
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {getCategoryProducts('commverse').map((product) => {
                  const colorClasses = getColorClasses(product.color);
                  const ProductIcon = product.icon;
                  const isInCart = cart.some(item => item.id === product.id);

                  return (
                    <Card key={product.id} className="relative" data-testid={`card-product-${product.id}`}>
                      {product.badge && (
                        <Badge className="absolute top-4 right-4" variant="secondary">
                          {product.badge}
                        </Badge>
                      )}
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-3`}>
                          <ProductIcon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <CardTitle className="text-xl" data-testid={`text-product-name-${product.id}`}>
                          {product.name}
                        </CardTitle>
                        <CardDescription data-testid={`text-product-description-${product.id}`}>
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-gray-900" data-testid={`text-product-price-${product.id}`}>
                            ${product.price}
                            <span className="text-sm font-normal text-gray-600">/month</span>
                          </div>
                          <Button 
                            onClick={() => addToCart(product)}
                            className={isInCart ? 'bg-green-600 hover:bg-green-700' : ''}
                            data-testid={`button-add-to-cart-${product.id}`}
                          >
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
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Coaching & Growth Section */}
            <div className="mb-16" data-testid="section-coaching">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Coaching & Growth</h2>
                <p className="text-gray-600">
                  Expert guidance to accelerate your business success
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getCategoryProducts('coaching').map((product) => {
                  const colorClasses = getColorClasses(product.color);
                  const ProductIcon = product.icon;
                  const isInCart = cart.some(item => item.id === product.id);

                  return (
                    <Card key={product.id} className="relative" data-testid={`card-product-${product.id}`}>
                      {product.badge && (
                        <Badge className="absolute top-4 right-4" variant="secondary">
                          {product.badge}
                        </Badge>
                      )}
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-3`}>
                          <ProductIcon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <CardTitle className="text-lg" data-testid={`text-product-name-${product.id}`}>
                          {product.name}
                        </CardTitle>
                        <CardDescription data-testid={`text-product-description-${product.id}`}>
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-3">
                          <div className="text-2xl font-bold text-gray-900" data-testid={`text-product-price-${product.id}`}>
                            ${product.price}
                            <span className="text-sm font-normal text-gray-600">/month</span>
                          </div>
                          <Button 
                            onClick={() => addToCart(product)}
                            className={`w-full ${isInCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            data-testid={`button-add-to-cart-${product.id}`}
                          >
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
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Business Expansion Section */}
            <div className="mb-16" data-testid="section-expansion">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Business Expansion</h2>
                <p className="text-gray-600">
                  Scale your presence across multiple locations
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {getCategoryProducts('expansion').map((product) => {
                  const colorClasses = getColorClasses(product.color);
                  const ProductIcon = product.icon;
                  const isInCart = cart.some(item => item.id === product.id);

                  return (
                    <Card key={product.id} data-testid={`card-product-${product.id}`}>
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-3`}>
                          <ProductIcon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <CardTitle className="text-xl" data-testid={`text-product-name-${product.id}`}>
                          {product.name}
                        </CardTitle>
                        <CardDescription data-testid={`text-product-description-${product.id}`}>
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-gray-900" data-testid={`text-product-price-${product.id}`}>
                            ${product.price}
                            <span className="text-sm font-normal text-gray-600">/month</span>
                          </div>
                          <Button 
                            onClick={() => addToCart(product)}
                            className={isInCart ? 'bg-green-600 hover:bg-green-700' : ''}
                            data-testid={`button-add-to-cart-${product.id}`}
                          >
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
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Support Section */}
            <div className="mb-16" data-testid="section-support">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Support & Services</h2>
                <p className="text-gray-600">
                  Premium support for your peace of mind
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {getCategoryProducts('support').map((product) => {
                  const colorClasses = getColorClasses(product.color);
                  const ProductIcon = product.icon;
                  const isInCart = cart.some(item => item.id === product.id);

                  return (
                    <Card key={product.id} data-testid={`card-product-${product.id}`}>
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-3`}>
                          <ProductIcon className={`w-6 h-6 ${colorClasses.text}`} />
                        </div>
                        <CardTitle className="text-xl" data-testid={`text-product-name-${product.id}`}>
                          {product.name}
                        </CardTitle>
                        <CardDescription data-testid={`text-product-description-${product.id}`}>
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-gray-900" data-testid={`text-product-price-${product.id}`}>
                            ${product.price}
                            <span className="text-sm font-normal text-gray-600">/month</span>
                          </div>
                          <Button 
                            onClick={() => addToCart(product)}
                            className={isInCart ? 'bg-green-600 hover:bg-green-700' : ''}
                            data-testid={`button-add-to-cart-${product.id}`}
                          >
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
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cart Sidebar (Desktop) */}
          <div className="hidden lg:block w-96">
            <div className="sticky top-20">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Shopping Cart
                    </span>
                    {cartItemCount > 0 && (
                      <Badge variant="secondary" data-testid="badge-cart-count">
                        {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500" data-testid="text-cart-empty">
                      Your cart is empty
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-start gap-3 pb-4 border-b" data-testid={`cart-item-${item.id}`}>
                            <div className="flex-1">
                              <div className="font-medium text-sm" data-testid={`cart-item-name-${item.id}`}>
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-600" data-testid={`cart-item-price-${item.id}`}>
                                ${item.price}/month
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, -1)}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center" data-testid={`cart-item-quantity-${item.id}`}>
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, 1)}
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => removeFromCart(item.id)}
                                data-testid={`button-remove-${item.id}`}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total per month:</span>
                          <span data-testid="text-cart-total">${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700" 
                        size="lg"
                        onClick={handleCheckout}
                        data-testid="button-checkout"
                      >
                        Proceed to Checkout
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile Cart Button */}
        {cart.length > 0 && (
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <Button
              size="lg"
              className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsCartOpen(true)}
              data-testid="button-mobile-cart"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} - ${cartTotal.toFixed(2)}
            </Button>
          </div>
        )}

        {/* Mobile Cart Modal */}
        {isCartOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsCartOpen(false)}>
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Shopping Cart</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 pb-4 border-b">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-sm text-gray-600">${item.price}/month</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total per month:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
