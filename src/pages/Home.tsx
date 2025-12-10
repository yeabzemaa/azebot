import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Sparkles } from 'lucide-react';
import { Hero } from '@/components/layout/Hero';
import { Section } from '@/components/layout/Section';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';
import { getFeaturedProducts, getNewProducts } from '@/lib/products';
import { SectionDivider, CoffeeBean } from '@/components/ui/EthiopianPatterns';

const categories = [
  {
    name: 'Women',
    href: '/shop?category=women',
    image: 'https://images.unsplash.com/photo-1633980990916-74317cba1ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjB0cmFkaXRpb25hbCUyMGRyZXNzJTIwd2hpdGV8ZW58MXx8fHwxNzY1Mjg0NTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Men',
    href: '/shop?category=men',
    image: 'https://images.unsplash.com/photo-1565728769229-e6e5b989a824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwbGluZW4lMjB0dW5pYyUyMGJlaWdlfGVufDF8fHx8MTc2NTI4NDU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Kids',
    href: '/shop?category=kids',
    image: 'https://images.unsplash.com/photo-1636357724570-a619b5f47be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwd2hpdGUlMjBkcmVzc3xlbnwxfHx8fDE3NjUyODQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Accessories',
    href: '/shop?category=accessories',
    image: 'https://images.unsplash.com/photo-1762331974787-76476e26c7a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY3Jvc3MlMjBwZW5kYW50JTIwamV3ZWxyeXxlbnwxfHx8fDE3NjUyODQ1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const features = [
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Handcrafted Quality',
    description: 'Artisan-made with care',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Cultural Heritage',
    description: 'Authentic Ethiopian designs',
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <>
      {/* Hero */}
      <Hero
        title="Celebrate Heritage, Wear Culture"
        subtitle="Discover authentic Ethiopian traditional and casual clothing, handcrafted with love"
        backgroundImage="https://images.unsplash.com/photo-1687137113677-f2a9a6c79fab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc2NTI4NDU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
        ctaButtons={[
          { text: 'Shop Women', href: '/shop?category=women', variant: 'primary' },
          { text: 'Shop Men', href: '/shop?category=men', variant: 'outline' },
        ]}
      />

      {/* Categories */}
      <Section
        title="Shop by Category"
        subtitle="Find the perfect piece for every occasion"
        backgroundColor="white"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="mb-1">{category.name}</h3>
                <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured Products */}
      <Section
        title="Featured Collection"
        subtitle="Handpicked pieces celebrating Ethiopian craftsmanship"
        backgroundColor="cream"
      >
        <ProductGrid products={featuredProducts} />
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
              View All Products
            </Button>
          </Link>
        </div>
      </Section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <Section
          title="New Arrivals"
          subtitle="Fresh styles, timeless traditions"
          backgroundColor="white"
        >
          <ProductGrid products={newProducts} />
        </Section>
      )}

      {/* Decorative Divider */}
      <SectionDivider icon={<CoffeeBean className="w-8 h-8" />} />

      {/* Features */}
      <Section backgroundColor="beige">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="cultural-card text-center hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold text-white mb-4 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-elegant">{feature.title}</h3>
              <p className="text-[--warm-grey]">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Decorative Divider */}
      <SectionDivider />

      {/* Cultural Story */}
      <Section
        title="Every Piece Tells a Story"
        backgroundColor="white"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl corner-decoration hover-lift">
            <img
              src="https://images.unsplash.com/photo-1630861413071-a424a4d6d155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjBjb2ZmZWUlMjBjZXJlbW9ueXxlbnwxfHx8fDE3NjUyODQ2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Ethiopian craftsmanship"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="accent-line-ethiopian">
            <h3 className="mb-6 font-elegant">Handcrafted with Love in Ethiopia</h3>
            <p className="text-[--warm-grey] mb-4 leading-relaxed">
              Each garment in our collection is meticulously handwoven by skilled Ethiopian artisans using techniques passed down through generations. From the pure white cotton base to the vibrant <span className="text-gold-accent">tibeb borders</span>, every detail honors our rich cultural heritage.
            </p>
            <p className="text-[--warm-grey] mb-6 leading-relaxed">
              When you wear <span className="font-elegant text-[--azebot-gold]">Azebot</span>, you&apos;re not just wearing clothing – you&apos;re celebrating centuries of tradition, supporting local communities, and connecting with a culture that values beauty, craftsmanship, and togetherness.
            </p>
            <Link to="/about">
              <Button variant="primary" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right" className="hover-lift">
                Learn Our Story
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}