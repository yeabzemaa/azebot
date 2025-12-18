'use client';

import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { getCartTotal, getCartItemCount } from '@/lib/cart';
import { useEffect, useState } from 'react';

export function useCart() {
  const store = useCartStore();
  const { currency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    ...store,
    total: getCartTotal(store.cart, currency),
    itemCount: mounted ? getCartItemCount(store.cart) : 0,
  };
}
