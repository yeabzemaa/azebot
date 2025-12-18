'use client';

import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { cart, updateCartItem, removeFromCart, total } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[--soft-cream] flex items-center justify-center">
        <Container className="text-center py-16">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-[--warm-grey]" />
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="text-[--warm-grey] mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--soft-cream]">
      <Container className="py-8">
        <h1 className="mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <CartItem
                key={`${item.product.id}-${item.selectedColor?.hex}-${item.selectedSize}-${index}`}
                item={item}
                onUpdateQuantity={(quantity) =>
                  updateCartItem(
                    item.product.id,
                    quantity,
                    item.selectedColor,
                    item.selectedSize
                  )
                }
                onRemove={() =>
                  removeFromCart(
                    item.product.id,
                    item.selectedColor,
                    item.selectedSize
                  )
                }
              />
            ))}
          </div>

          {/* Summary */}
          <div>
            <CartSummary subtotal={total} />
          </div>
        </div>
      </Container>
    </div>
  );
}