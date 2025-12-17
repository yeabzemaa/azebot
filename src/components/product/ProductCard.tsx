'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { ProtectedAction } from '@/components/auth/ProtectedAction';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { currency } = useCurrencyStore();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Get image URL with fallback
  const getImageUrl = () => {
    if (imageError || !product.images || product.images.length === 0) {
      return 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&h=600&fit=crop';
    }
    return product.images[0];
  };

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

  const price = currency === 'USD'
    ? (product.salePriceUSD || product.priceUSD)
    : (product.salePriceETB || product.priceETB);
  const originalPrice = currency === 'USD' ? product.priceUSD : product.priceETB;
  const hasDiscount = currency === 'USD'
    ? !!product.salePriceUSD
    : !!product.salePriceETB;

  return (
    <Link
      to={`/shop/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[--linen-beige]">
        <img
          src={getImageUrl()}
          alt={product.name}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && <Badge variant="new">New</Badge>}
          {hasDiscount && <Badge variant="sale">Sale</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-[--deep-charcoal] hover:text-[--sacred-red] transition-all shadow-md hover:shadow-lg hover:scale-110 z-20 cursor-pointer"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 transition-all ${inWishlist ? 'fill-[--sacred-red] text-[--sacred-red] scale-110' : ''}`} />
        </button>

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

        <div className="mb-2 flex items-center gap-2">
          <StarRating rating={product.rating || 0} size="sm" />
          {product.reviewCount !== undefined && (
            <span className="text-xs text-[--warm-grey]">
              ({product.reviewCount})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[--deep-charcoal]">
            {formatPrice(price, currency)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-[--warm-grey] line-through">
              {formatPrice(originalPrice, currency)}
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