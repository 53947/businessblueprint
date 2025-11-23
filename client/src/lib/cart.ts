interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'plan' | 'addon';
  billingCycle?: 'monthly' | 'annual';
}

export function addToCart(id: string, name: string, price: number, type: 'plan' | 'addon', billingCycle?: 'monthly' | 'annual'): void {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1, type, billingCycle: billingCycle || 'monthly' });
  }
  
  localStorage.setItem('marketplace_cart', JSON.stringify(cart));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
}

export function getCart(): CartItem[] {
  const cartData = localStorage.getItem('marketplace_cart');
  if (!cartData) return [];
  
  try {
    return JSON.parse(cartData);
  } catch {
    return [];
  }
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
