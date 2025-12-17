import { create } from 'zustand';

export type Currency = 'USD' | 'ETB';

interface CurrencyStore {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    toggleCurrency: () => void;
}

// Optimized for instant updates - removed persist middleware
export const useCurrencyStore = create<CurrencyStore>((set) => ({
    currency: (typeof window !== 'undefined' && localStorage.getItem('currency') as Currency) || 'ETB',
    setCurrency: (currency) => {
        set({ currency });
        if (typeof window !== 'undefined') {
            localStorage.setItem('currency', currency);
        }
    },
    toggleCurrency: () => set((state) => {
        const newCurrency = state.currency === 'USD' ? 'ETB' : 'USD';
        if (typeof window !== 'undefined') {
            localStorage.setItem('currency', newCurrency);
        }
        return { currency: newCurrency };
    }),
}));
