import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, Product, Color, Size } from '@/lib/types';

interface CartState {
    cart: Cart;
    addToCart: (product: Product, quantity?: number, selectedColor?: Color, selectedSize?: Size) => void;
    updateCartItem: (productId: string, quantity: number, selectedColor?: Color, selectedSize?: Size) => void;
    removeFromCart: (productId: string, selectedColor?: Color, selectedSize?: Size) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: { items: [], updatedAt: new Date().toISOString() },

            addToCart: (product, quantity = 1, selectedColor, selectedSize) => {
                const currentCart = get().cart;
                const items = [...currentCart.items];

                const existingItemIndex = items.findIndex(
                    item =>
                        item.product.id === product.id &&
                        item.selectedColor?.hex === selectedColor?.hex &&
                        item.selectedSize === selectedSize
                );

                if (existingItemIndex > -1) {
                    items[existingItemIndex].quantity += quantity;
                } else {
                    items.push({
                        product,
                        quantity,
                        selectedColor,
                        selectedSize,
                    });
                }

                set({
                    cart: {
                        items,
                        updatedAt: new Date().toISOString(),
                    },
                });
            },

            updateCartItem: (productId, quantity, selectedColor, selectedSize) => {
                const currentCart = get().cart;
                const items = [...currentCart.items];

                const itemIndex = items.findIndex(
                    item =>
                        item.product.id === productId &&
                        item.selectedColor?.hex === selectedColor?.hex &&
                        item.selectedSize === selectedSize
                );

                if (itemIndex > -1) {
                    if (quantity <= 0) {
                        items.splice(itemIndex, 1);
                    } else {
                        items[itemIndex].quantity = quantity;
                    }

                    set({
                        cart: {
                            items,
                            updatedAt: new Date().toISOString(),
                        },
                    });
                }
            },

            removeFromCart: (productId, selectedColor, selectedSize) => {
                const currentCart = get().cart;
                const items = currentCart.items.filter(
                    item =>
                        !(
                            item.product.id === productId &&
                            item.selectedColor?.hex === selectedColor?.hex &&
                            item.selectedSize === selectedSize
                        )
                );

                set({
                    cart: {
                        items,
                        updatedAt: new Date().toISOString(),
                    },
                });
            },

            clearCart: () => {
                set({
                    cart: {
                        items: [],
                        updatedAt: new Date().toISOString(),
                    },
                });
            },
        }),
        {
            name: 'azebot_cart_store', // New key to avoid conflict with old format
        }
    )
);
