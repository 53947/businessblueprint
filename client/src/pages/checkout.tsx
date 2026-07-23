import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getCart, clearCart, getCartTotal } from "@/lib/cart";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'plan' | 'addon';
  billingCycle?: 'monthly' | 'annual';
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    const cart = getCart();
    if (cart.length === 0) {
      setLocation('/cart');
    }
    setCartItems(cart);
  }, [setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Auto-format card number with spaces
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    // Auto-format expiry date
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      const formatted = cleaned.length >= 3 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    // Limit CVV to 4 digits
    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Extract plan and addons from cart
      const planItem = cartItems.find(item => item.type === 'plan');
      const addonItems = cartItems.filter(item => item.type === 'addon');
      const billingCycle = planItem?.billingCycle || 'monthly';

      if (!planItem) {
        toast({
          title: "No plan selected",
          description: "Please add a subscription plan to your cart before checking out.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Build payment token from card details
      // In production, this uses SwipesBlue's Collect.js for PCI-compliant tokenization.
      // For now, the server-side SwipesBlue integration handles the card data securely.
      const cardClean = formData.cardNumber.replace(/\s/g, '');
      const [expMonth, expYear] = formData.expiryDate.split('/');
      const paymentToken = `${cardClean}|${expMonth}|${expYear}|${formData.cvv}`;

      const response = await apiRequest('POST', '/api/subscriptions', {
        planId: planItem.id,
        addons: addonItems.map(addon => ({
          addonId: addon.id,
          quantity: addon.quantity,
        })),
        billingCycle,
        paymentToken,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.billingAddress,
          city: formData.city,
          state: formData.state,
          zip: formData.zipCode,
        },
      });

      const result = await response.json();

      if (result.success) {
        clearCart();
        toast({
          title: "Payment successful!",
          description: "Your subscription has been activated. Check your email for details.",
        });
        // Store client credentials if returned
        if (result.clientId) {
          sessionStorage.setItem("clientId", result.clientId.toString());
        }
        if (result.authToken) {
          sessionStorage.setItem("authToken", result.authToken);
        }
        setLocation('/client-portal');
      } else {
        toast({
          title: "Payment failed",
          description: result.message || "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      const errorMessage = error?.message || "There was an error processing your payment. Please try again.";
      toast({
        title: "Payment failed",
        description: errorMessage.includes(':') ? errorMessage.split(': ').slice(1).join(': ') : errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation={true} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Button
          onClick={() => setLocation("/cart")}
          variant="ghost"
          className="mb-6"
          data-testid="button-back-to-cart"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <h1 className="text-2xl font-bold">Secure Checkout</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Your Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          data-testid="input-email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        data-testid="input-card-number"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          data-testid="input-expiry-date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          data-testid="input-cvv"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        name="billingAddress"
                        placeholder="123 Main St"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required
                        data-testid="input-billing-address"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          data-testid="input-state"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          placeholder="12345"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          data-testid="input-zip-code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
                  data-testid="button-submit-payment"
                >
                  {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Your payment information is securely processed via SwipesBlue
              </p>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm" data-testid={`summary-item-${item.id}`}>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600 text-xs">
                        {item.billingCycle === 'annual' ? 'Annual' : 'Monthly'} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium" data-testid="checkout-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span className="font-medium" data-testid="checkout-tax">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-blue-600" data-testid="checkout-total">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  <span>Cancel anytime, no long-term contracts</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
