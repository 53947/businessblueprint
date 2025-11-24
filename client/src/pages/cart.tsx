import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getCart, removeFromCart, updateQuantity, clearCart, getCartTotal } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'plan' | 'addon';
  billingCycle?: 'monthly' | 'annual';
}

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart on mount
    setCartItems(getCart());

    // Listen for cart updates
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setCartItems(customEvent.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const handleCheckout = () => {
    setLocation('/checkout');
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.07; // 7% tax (adjust as needed)
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            onClick={() => setLocation("/marketplace")}
            variant="ghost"
            className="mb-6"
            data-testid="button-back-to-marketplace"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>

          <Card className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items from the marketplace to get started!</p>
            <Button
              onClick={() => setLocation("/marketplace")}
              data-testid="button-browse-marketplace"
            >
              Browse Marketplace
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          onClick={() => setLocation("/marketplace")}
          variant="ghost"
          className="mb-6"
          data-testid="button-back-to-marketplace"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <Button
                onClick={handleClearCart}
                variant="outline"
                size="sm"
                data-testid="button-clear-cart"
              >
                Clear Cart
              </Button>
            </div>

            {cartItems.map((item) => (
              <Card key={item.id} className="p-6" data-testid={`cart-item-${item.id}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1" data-testid={`cart-item-name-${item.id}`}>
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.type === 'plan' ? 'Plan' : 'Add-on'} • {item.billingCycle === 'annual' ? 'Annual' : 'Monthly'}
                    </p>
                    <p className="text-lg font-bold text-blue-600" data-testid={`cart-item-price-${item.id}`}>
                      ${item.price}/{item.billingCycle === 'annual' ? 'yr' : 'mo'}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        variant="outline"
                        size="sm"
                        disabled={item.quantity <= 1}
                        data-testid={`button-decrease-quantity-${item.id}`}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-medium" data-testid={`cart-item-quantity-${item.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        variant="outline"
                        size="sm"
                        data-testid={`button-increase-quantity-${item.id}`}
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => handleRemoveItem(item.id)}
                      variant="ghost"
                      size="sm"
                      data-testid={`button-remove-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium" data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span className="font-medium" data-testid="cart-tax">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-blue-600" data-testid="cart-total">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Secure payment powered by NMI
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
