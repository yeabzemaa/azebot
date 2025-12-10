'use client';

import { useCartStore } from '@/store/useCartStore';
import { getCartTotal, getCartItemCount } from '@/lib/cart';
import { useEffect, useState } from 'react';

export function useCart() {
  const store = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    ...store,
    total: getCartTotal(store.cart),
    itemCount: mounted ? getCartItemCount(store.cart) : 0,
  };
}
