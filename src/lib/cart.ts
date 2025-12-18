import { Cart, CartItem, Product, Color, Size } from './types';

const CART_KEY = 'azebot_cart';
const WISHLIST_KEY = 'azebot_wishlist';

// Cart functions
export const getCart = (): Cart => {
  if (typeof window === 'undefined') return { items: [], updatedAt: new Date().toISOString() };

  try {
    const stored = localStorage.getItem(CART_KEY);
    if (!stored) return { items: [], updatedAt: new Date().toISOString() };
    return JSON.parse(stored);
  } catch {
    return { items: [], updatedAt: new Date().toISOString() };
  }
};

export const saveCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return;

  cart.updatedAt = new Date().toISOString();
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (
  product: Product,
  quantity: number = 1,
  selectedColor?: Color,
  selectedSize?: Size
): Cart => {
  const cart = getCart();

  // Check if item already exists with same color and size
  const existingItemIndex = cart.items.findIndex(
    item =>
      item.product.id === product.id &&
      item.selectedColor?.hex === selectedColor?.hex &&
      item.selectedSize === selectedSize
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
  }

  saveCart(cart);
  return cart;
};

export const updateCartItem = (
  productId: string,
  quantity: number,
  selectedColor?: Color,
  selectedSize?: Size
): Cart => {
  const cart = getCart();

  const itemIndex = cart.items.findIndex(
    item =>
      item.product.id === productId &&
      item.selectedColor?.hex === selectedColor?.hex &&
      item.selectedSize === selectedSize
  );

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (
  productId: string,
  selectedColor?: Color,
  selectedSize?: Size
): Cart => {
  const cart = getCart();

  cart.items = cart.items.filter(
    item =>
      !(
        item.product.id === productId &&
        item.selectedColor?.hex === selectedColor?.hex &&
        item.selectedSize === selectedSize
      )
  );

  saveCart(cart);
  return cart;
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = (cart: Cart, currency: 'USD' | 'ETB' = 'ETB'): number => {
  return cart.items.reduce((total, item) => {
    const price = currency === 'USD'
      ? (item.product.salePriceUSD || item.product.priceUSD)
      : (item.product.salePriceETB || item.product.priceETB);
    return total + price * item.quantity;
  }, 0);
};

export const getCartItemCount = (cart: Cart): number => {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
};

export const calculateShipping = (subtotal: number, currency: 'USD' | 'ETB' = 'ETB'): number => {
  const threshold = currency === 'USD' ? 100 : 17500; // 100 USD = ~17500 ETB
  if (subtotal >= threshold) return 0; // Free shipping over threshold
  return currency === 'USD' ? 15 : 2625; // 15 USD = ~2625 ETB
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08; // 8% tax
};

// Wishlist functions
export const getWishlist = (): string[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const addToWishlist = (productId: string): string[] => {
  const wishlist = getWishlist();

  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }

  return wishlist;
};

export const removeFromWishlist = (productId: string): string[] => {
  const wishlist = getWishlist();
  const filtered = wishlist.filter(id => id !== productId);

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
  return filtered;
};

export const isInWishlist = (productId: string): boolean => {
  return getWishlist().includes(productId);
};
