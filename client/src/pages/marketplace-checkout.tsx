import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { NMIPaymentForm, PaymentFormData } from "@/components/nmi-payment-form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ShoppingCart, Shield, Lock, CreditCard } from "lucide-react";
import { BrandLogo, BrandIcon } from "@/components/brand-logo";
import airswipedLogo from "@assets/swipesblue/swipesblue brandmark.png";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'app' | 'addon';
}

export default function MarketplaceCheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const setupFee = 0; // No setup fee for marketplace items
  const tax = cartTotal * 0.08; // 8% tax (adjust as needed)
  const total = cartTotal + setupFee + tax;

  const handlePaymentToken = async (paymentToken: string, formData: PaymentFormData) => {
    setIsProcessing(true);

    try {
      const orderData = {
        items: cart,
        paymentToken,
        customerInfo: formData,
        totals: {
          subtotal: cartTotal,
          tax,
          total
        }
      };

      const response = await apiRequest('POST', '/api/marketplace/orders', orderData);
      
      // Check if response is OK (2xx status)
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Payment processing failed');
      }

      const result = await response.json();

      // Double-check success flag in response
      if (!result.success) {
        throw new Error(result.message || 'Payment processing failed');
      }

      // Only clear cart and redirect on successful payment
      localStorage.removeItem('marketplace_cart');

      toast({
        title: 'Order Successful!',
        description: 'Your marketplace items have been activated.',
      });

      // Redirect to portal
      setLocation('/portal');
    } catch (error) {
      console.error('Order failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an issue processing your order. Please try again.';
      toast({
        title: 'Payment Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: 'Payment Error',
      description: error,
      variant: 'destructive',
    });
    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items from the marketplace to get started.</p>
          <Button onClick={() => setLocation('/marketplace')}>
            Go to Marketplace
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* swipesblue.com Branded Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 py-8 border-b border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrandLogo brand="swipesblue" size="md" variant="dark" showIcon={true} />
              <div>
                <p className="text-red-100 text-sm">Secure Payment Gateway</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b" data-testid={`checkout-item-${item.id}`}>
                      <div className="flex-1">
                        <div className="font-medium text-sm" data-testid={`checkout-item-name-${item.id}`}>
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price}/month × {item.quantity}
                        </div>
                      </div>
                      <div className="font-semibold" data-testid={`checkout-item-total-${item.id}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium" data-testid="text-subtotal">${cartTotal.toFixed(2)}</span>
                    </div>
                    {setupFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Setup Fee:</span>
                        <span className="font-medium">${setupFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%):</span>
                      <span className="font-medium" data-testid="text-tax">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total per month:</span>
                    <span className="text-2xl font-bold text-blue-600" data-testid="text-total">${total.toFixed(2)}</span>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-800">
                        Your payment is secured by swipesblue.com with enterprise-grade encryption and fraud protection.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Secure Checkout</div>
                      <div className="text-xs text-gray-600">
                        Powered by swipesblue.com - Your card information is never stored on our servers
                      </div>
                    </div>
                  </div>
                </div>

                <NMIPaymentForm
                  onPaymentToken={handlePaymentToken}
                  onError={handlePaymentError}
                  amount={total}
                  description={`Marketplace Order - ${cart.length} item${cart.length > 1 ? 's' : ''}`}
                  loading={isProcessing}
                  disabled={isProcessing}
                />

                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>PCI Compliant</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>256-bit SSL</span>
                  </div>
                  <span>•</span>
                  <span>Fraud Protected</span>
                </div>
              </CardContent>
            </Card>

            {/* swipesblue.com Trust Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="text-sm text-gray-600">
                  Secured by <BrandLogo brand="swipesblue" size="sm" variant="light" textOnly={true} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
            <p className="text-sm text-gray-600">Bank-level encryption protects your data</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Privacy First</h3>
            <p className="text-sm text-gray-600">We never store your payment details</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Instant Activation</h3>
            <p className="text-sm text-gray-600">Your services activate immediately</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
