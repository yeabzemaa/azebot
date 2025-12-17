'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Color, Size, Product } from '@/lib/types';
import { ProductImageZoom } from '@/components/product/ProductImageZoom';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState<Color | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const fetchedProduct = await getProductBySlug(slug);
        setProduct(fetchedProduct);

        if (fetchedProduct) {
          // Initialize selections
          setSelectedColor(fetchedProduct.colors[0]);
          setSelectedSize(fetchedProduct.sizes[0]);
          setActiveImageIndex(0);

          // Load related
          const related = await getRelatedProducts(fetchedProduct.id);
          setRelatedProducts(related);

          console.log('Product loaded:', fetchedProduct);
          console.log('Product images:', fetchedProduct.images);
        }
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[--soft-cream]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--azebot-gold]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <Container className="py-16 text-center">
        <h2 className="mb-4">Product Not Found</h2>
        <Link to="/shop">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </Container>
    );
  }

  const price = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedColor, selectedSize);

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[--soft-cream]">
      <Container className="py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[--warm-grey]">
          <Link to="/" className="hover:text-[--azebot-gold]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[--azebot-gold]">Shop</Link>
          <span>/</span>
          <span className="text-[--deep-charcoal]">{product.name}</span>
        </div>

        <Link to="/shop" className="inline-flex items-center gap-2 text-[--azebot-gold] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="relative aspect-[3/4] bg-white rounded-lg shadow-lg z-10 group">
            {product.images.length > 0 ? (
              <ProductImageZoom
                image={product.images[activeImageIndex]}
                alt={product.name}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all flex items-center justify-center text-[--deep-charcoal] hover:text-[--azebot-gold] border border-[--linen-beige]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-white hover:scale-110 transition-all flex items-center justify-center text-[--deep-charcoal] hover:text-[--azebot-gold] border border-[--linen-beige]"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-20">
                <div className="flex gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md overflow-x-auto max-w-full">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === index
                        ? 'border-[--azebot-gold] scale-110'
                        : 'border-transparent hover:border-[--azebot-gold]/50'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Info */}
          <div>
            <h1 className="mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating || 0} showNumber />
              {product.reviewCount !== undefined && (
                <span className="text-sm text-[--warm-grey]">
                  ({product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{formatPrice(price)}</span>
              {hasDiscount && (
                <span className="text-xl text-[--warm-grey] line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-[--warm-grey] mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3">
                  Color: <span className="text-[--warm-grey]">{selectedColor?.name}</span>
                </h4>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor?.hex === color.hex
                        ? 'border-[--azebot-gold] scale-110'
                        : 'border-[--warm-grey]/30 hover:border-[--azebot-gold]'
                        }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
              <div className="mb-6">
                <h4 className="mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded transition-all ${selectedSize === size
                        ? 'border-[--azebot-gold] bg-[--azebot-gold] text-white'
                        : 'border-[--warm-grey]/30 hover:border-[--azebot-gold] hover:text-[--azebot-gold]'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h4 className="mb-3">Quantity</h4>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-md border-2 border-[--warm-grey]/30 hover:border-[--azebot-gold] hover:text-[--azebot-gold] transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-md border-2 border-[--warm-grey]/30 hover:border-[--azebot-gold] hover:text-[--azebot-gold] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                icon={showSuccess ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                onClick={handleAddToCart}
                loading={isAdding}
                className="flex-1"
              >
                {showSuccess ? 'Added!' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg" icon={<Heart className="w-5 h-5" />}>
                Wishlist
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[--ethiopian-green] flex-shrink-0 mt-0.5" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[--ethiopian-green] flex-shrink-0 mt-0.5" />
                <span>Handcrafted with authentic Ethiopian techniques</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-[--ethiopian-green] flex-shrink-0 mt-0.5" />
                <span>30-day return policy</span>
              </div>
            </div>

            {/* Product Details */}
            {product.details && (
              <div className="mt-8 pt-8 border-t border-[--linen-beige]">
                <h4 className="mb-4">Product Details</h4>
                <dl className="space-y-2 text-sm">
                  {product.details.material && (
                    <>
                      <dt className="text-[--warm-grey]">Material:</dt>
                      <dd className="mb-2">{product.details.material}</dd>
                    </>
                  )}
                  {product.details.care && (
                    <>
                      <dt className="text-[--warm-grey]">Care:</dt>
                      <dd className="mb-2">{product.details.care}</dd>
                    </>
                  )}
                  {product.details.origin && (
                    <>
                      <dt className="text-[--warm-grey]">Origin:</dt>
                      <dd>{product.details.origin}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {
          relatedProducts.length > 0 && (
            <div>
              <h2 className="mb-8">You Might Also Like</h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          )
        }
      </Container >
    </div >
  );
}