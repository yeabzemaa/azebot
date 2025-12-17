import { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useAuth } from '@/hooks/useAuth';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
    const { wishlist, syncWishlist, isLoading } = useWishlistStore();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            syncWishlist();
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-[--soft-cream] py-16">
            <Container>
                <div className="flex items-center gap-3 mb-8">
                    <Heart className="w-8 h-8 text-[--azebot-gold] fill-current" />
                    <h1 className="text-3xl font-elegant text-[--deep-charcoal] m-0">My Wishlist</h1>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--azebot-gold]"></div>
                    </div>
                ) : wishlist.length > 0 ? (
                    <ProductGrid products={wishlist} />
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                        <Heart className="w-16 h-16 text-[--linen-beige] mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-[--deep-charcoal] mb-2">Your wishlist is empty</h2>
                        <p className="text-[--warm-grey] mb-8">Seems like you haven't found anything yet.</p>
                        <Link to="/shop">
                            <Button variant="primary">Start Shopping</Button>
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    );
}
