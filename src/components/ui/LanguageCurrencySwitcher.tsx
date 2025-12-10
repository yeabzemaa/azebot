'use client';

import { useState } from 'react';
import { Globe, DollarSign } from 'lucide-react';

export function LanguageSwitcher() {
    const [language, setLanguage] = useState<'en' | 'am'>('en');

    return (
        <div className="relative group">
            <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--linen-beige] transition-colors"
                aria-label="Switch language"
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'አማ'}</span>
            </button>

            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-[--linen-beige] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                    onClick={() => setLanguage('en')}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-[--linen-beige] transition-colors ${language === 'en' ? 'bg-[--soft-cream] text-[--azebot-gold] font-semibold' : ''
                        }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLanguage('am')}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-[--linen-beige] transition-colors font-amharic ${language === 'am' ? 'bg-[--soft-cream] text-[--azebot-gold] font-semibold' : ''
                        }`}
                >
                    አማርኛ
                </button>
            </div>
        </div>
    );
}

export function CurrencySwitcher() {
    const [currency, setCurrency] = useState<'USD' | 'ETB'>('USD');

    return (
        <div className="relative group">
            <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[--linen-beige] transition-colors"
                aria-label="Switch currency"
            >
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">{currency}</span>
            </button>

            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-[--linen-beige] overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                    onClick={() => setCurrency('USD')}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-[--linen-beige] transition-colors ${currency === 'USD' ? 'bg-[--soft-cream] text-[--azebot-gold] font-semibold' : ''
                        }`}
                >
                    USD ($)
                </button>
                <button
                    onClick={() => setCurrency('ETB')}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-[--linen-beige] transition-colors ${currency === 'ETB' ? 'bg-[--soft-cream] text-[--azebot-gold] font-semibold' : ''
                        }`}
                >
                    ETB (ብር)
                </button>
            </div>
        </div>
    );
}
