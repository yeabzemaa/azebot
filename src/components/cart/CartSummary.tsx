import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { calculateShipping, calculateTax } from '@/lib/cart';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface CartSummaryProps {
  subtotal: number;
  showActions?: boolean;
}

export function CartSummary({ subtotal, showActions = true }: CartSummaryProps) {
  const { currency } = useCurrencyStore();
  const shipping = calculateShipping(subtotal, currency);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = currency === 'USD' ? 100 : 17500;

  return (
    <div className="bg-white rounded-lg p-6 sticky top-24">
      <h3 className="mb-6">Order Summary</h3>

      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-[--warm-grey]">Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[--warm-grey]">Shipping</span>
          <span className={shipping === 0 ? 'text-[--ethiopian-green]' : ''}>
            {shipping === 0 ? 'FREE' : formatPrice(shipping, currency)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[--warm-grey]">Tax</span>
          <span>{formatPrice(tax, currency)}</span>
        </div>
      </div>

      <div className="border-t border-[--linen-beige] pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg">Total</span>
          <span className="text-2xl">{formatPrice(total, currency)}</span>
        </div>
      </div>

      {showActions && (
        <div className="space-y-3 mb-6">
          <Link to="/checkout" className="block">
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
          <Link to="/shop" className="block">
            <Button variant="ghost" size="md" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}

      {/* Trust Badges */}
      <div className="space-y-3 text-sm text-[--warm-grey]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 flex-shrink-0" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 flex-shrink-0" />
          <span>30-day free returns</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 flex-shrink-0" />
          <span>Free shipping over {formatPrice(freeShippingThreshold, currency)}</span>
        </div>
      </div>
    </div>
  );
}