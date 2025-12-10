'use client';

import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity, selectedColor, selectedSize } = item;
  const price = product.salePrice || product.price;
  const subtotal = price * quantity;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg">
      {/* Image */}
      <Link to={`/shop/${product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-[--linen-beige]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/shop/${product.slug}`} className="hover:text-[--azebot-gold] transition-colors">
          <h4 className="mb-1 line-clamp-1">{product.name}</h4>
        </Link>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[--warm-grey] mb-3">
          {selectedColor && <span>Color: {selectedColor.name}</span>}
          {selectedSize && <span>Size: {selectedSize}</span>}
        </div>

        <div className="flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded border border-[--warm-grey]/30 hover:border-[--azebot-gold] transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="w-8 h-8 rounded border border-[--warm-grey]/30 hover:border-[--azebot-gold] transition-colors"
            >
              +
            </button>
          </div>

          <span>{formatPrice(price)}</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={onRemove}
          className="p-1 hover:bg-[--linen-beige] rounded transition-colors"
          aria-label="Remove item"
        >
          <X className="w-5 h-5 text-[--warm-grey]" />
        </button>

        <span>{formatPrice(subtotal)}</span>
      </div>
    </div>
  );
}