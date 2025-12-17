import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, ENDPOINTS } from '@/lib/api';
import { Product } from '@/lib/types';
import { useAuthStore } from './useAuthStore';

interface WishlistState {
    wishlist: Product[];
    isLoading: boolean;
    addToWishlist: (product: Product) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    toggleWishlist: (product: Product) => Promise<void>;
    syncWishlist: () => Promise<void>;
    isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            wishlist: [],
            isLoading: false,

            addToWishlist: async (product) => {
                const { isAuthenticated } = useAuthStore.getState();

                // Optimistic update
                set((state) => {
                    if (state.wishlist.find(p => p.id === product.id)) return state;
                    return { wishlist: [...state.wishlist, product] };
                });

                if (isAuthenticated) {
                    try {
                        await api.post(ENDPOINTS.WISHLIST.TOGGLE, { product_id: product.id }, true);
                    } catch (error) {
                        console.error('Failed to sync wishlist add:', error);
                        // Revert on failure? For now, we keep local state to not jar user
                    }
                }
            },

            removeFromWishlist: async (productId) => {
                const { isAuthenticated } = useAuthStore.getState();

                // Optimistic update
                set((state) => ({
                    wishlist: state.wishlist.filter((p) => p.id !== productId),
                }));

                if (isAuthenticated) {
                    try {
                        await api.post(ENDPOINTS.WISHLIST.TOGGLE, { product_id: productId }, true);
                    } catch (error) {
                        console.error('Failed to sync wishlist remove:', error);
                    }
                }
            },

            toggleWishlist: async (product) => {
                const { isInWishlist, addToWishlist, removeFromWishlist } = get();
                if (isInWishlist(product.id)) {
                    await removeFromWishlist(product.id);
                } else {
                    await addToWishlist(product);
                }
            },

            syncWishlist: async () => {
                const { isAuthenticated } = useAuthStore.getState();
                if (!isAuthenticated) return;

                set({ isLoading: true });
                try {
                    // The API returns a list of products in the wishlist
                    const response = await api.get<{ results: Product[] }>(ENDPOINTS.WISHLIST.GET, true);
                    // Assuming response structure, adjust if API differs (e.g. just array)
                    const items = Array.isArray(response) ? response : (response.results || []);
                    set({ wishlist: items });
                } catch (error) {
                    console.error('Failed to sync wishlist:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            isInWishlist: (productId) => {
                return get().wishlist.some((p) => p.id === productId);
            },
        }),
        {
            name: 'azebot_wishlist_storage',
        }
    )
);
