import { useCurrencyStore } from '@/store/useCurrencyStore';

export function CurrencySwitcher() {
    const { currency, toggleCurrency } = useCurrencyStore();

    return (
        <button
            onClick={toggleCurrency}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
            aria-label="Toggle currency"
        >
            <span className="text-[--azebot-gold]">{currency}</span>
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
            </svg>
        </button>
    );
}
