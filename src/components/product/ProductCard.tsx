'use client';

import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { ProtectedAction } from '@/components/auth/ProtectedAction';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsAdding(true);

    addToCart(
      product,
      1,
      product.colors[0],
      product.sizes[0]
    );

    setTimeout(() => setIsAdding(false), 500);
  };

  const price = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[--linen-beige]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && <Badge variant="new">New</Badge>}
          {hasDiscount && <Badge variant="sale">Sale</Badge>}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ProtectedAction onAction={handleAddToCart}>
            <Button
              size="sm"
              variant="primary"
              icon={<ShoppingCart className="w-4 h-4" />}
              loading={isAdding}
              className="shadow-lg"
            >
              Add
            </Button>
          </ProtectedAction>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 group-hover:text-[--azebot-gold] transition-colors">
          {product.name}
        </h3>

        {product.rating && (
          <div className="mb-2">
            <StarRating rating={product.rating} size="sm" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-lg text-[--deep-charcoal]">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-[--warm-grey] line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {product.colors.length > 1 && (
          <div className="mt-3 flex gap-1.5">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border-2 border-[--warm-grey]/30"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-[--warm-grey]/30 flex items-center justify-center text-xs">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}