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

export function removeFromCart(id: string): void {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  localStorage.setItem('marketplace_cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedCart }));
}

export function updateQuantity(id: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find(item => item.id === id);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = quantity;
      localStorage.setItem('marketplace_cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    }
  }
}

export function clearCart(): void {
  localStorage.setItem('marketplace_cart', JSON.stringify([]));
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}
