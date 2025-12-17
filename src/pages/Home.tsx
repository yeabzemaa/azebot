import { useEffect, useState } from 'react';
import { Hero } from '@/components/layout/Hero';
import { Container } from '@/components/layout/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Truck, Shield, Clock, Award } from 'lucide-react';
import { getFeaturedProducts, getNewProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const [featured, newProducts] = await Promise.all([
          getFeaturedProducts(),
          getNewProducts()
        ]);
        setFeaturedProducts(featured);
        setNewArrivals(newProducts);
      } catch (error) {
        console.error('Failed to load home products', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleExploreClick = () => {
    navigate('/shop?new=true');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Discover Improving Ethiopian Elegance"
        subtitle="Handcrafted traditional wear that blends heritage with modern style."
        backgroundImage="assets/pp.jpg"
        ctaButtons={[
          {
            text: "Shop Now",
            href: "/shop",
            variant: "premium",
            icon: <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          }
        ]}
      />



      {/* Featured Products */}
      <section className="py-16">
        <Container>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-elegant text-[--deep-charcoal] mb-2">Featured Collections</h2>
              <p className="text-[--warm-grey]">Curated pieces just for you</p>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="hidden sm:flex" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View All
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--azebot-gold]"></div>
            </div>
          ) : (
            <ProductGrid products={featuredProducts.slice(0, 4)} />
          )}
        </Container>
      </section>

      {/* Banner Section */}
      <section className="py-16 bg-[--linen-beige]">
        <Container>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[--ethiopian-red]/60 via-[--ethiopian-yellow]/50 to-[--ethiopian-green]/60 z-10 pointer-events-none"></div>
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
              alt="New Collection"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-4xl md:text-5xl font-elegant mb-4">New Season Arrivals</h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-100">
                Explore our latest collection of Tibeb dresses and accessories.
              </p>
              <Button
                size="lg"
                variant="primary"
                className="bg-[--azebot-gold] text-white border-none hover:bg-[--amber-gold] hover:scale-105 relative z-30 cursor-pointer shadow-xl font-semibold transition-all duration-300"
                onClick={handleExploreClick}
              >
                Explore Collection
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-[--soft-cream]/80">
        <Container>
          <div className="flex justify-between items-end mb-8">
            <div className="border-l-4 border-[--azebot-gold] pl-4">
              <h2 className="text-3xl font-elegant text-[--deep-charcoal] mb-2">New Arrivals</h2>
              <p className="text-[--warm-grey]">Fresh Ethiopian styles added this week</p>
            </div>
            <Link to="/shop?new=true">
              <Button variant="ghost" className="hidden sm:flex text-[--azebot-gold] hover:text-[--amber-gold] hover:bg-white/50" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View All Collection
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--azebot-gold]"></div>
            </div>
          ) : (
            <ProductGrid products={newArrivals.slice(0, 4)} />
          )}
        </Container>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-[--soft-cream]">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Truck className="w-8 h-8 text-[--azebot-gold]" />}
              title="Fast Shipping"
              description="Reliable delivery across Ethiopia and internationally."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-[--azebot-gold]" />}
              title="Secure Payment"
              description="Safe transactions with Telebirr and major cards."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-[--azebot-gold]" />}
              title="Authentic Quality"
              description="Guaranteed authentic handwoven fabrics."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-[--azebot-gold]" />}
              title="24/7 Support"
              description="Dedicated customer service for your needs."
            />
          </div>
        </Container>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative p-8 bg-white rounded-2xl border border-[--linen-beige]/50 hover:border-[--azebot-gold]/30 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[--azebot-gold] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex flex-col items-center">
        <div className="p-4 rounded-xl bg-[--soft-cream] text-[--azebot-gold] mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-[--azebot-gold] group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-xl font-elegant text-[--deep-charcoal] mb-3">{title}</h3>
        <p className="text-[--warm-grey] text-center leading-relaxed">{description}</p>
      </div>
    </div>
  );
}