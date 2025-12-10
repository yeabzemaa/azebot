import { Link } from 'react-router-dom';
import { Heart, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Hero } from '@/components/layout/Hero';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Heritage & Culture',
      description: 'We honor Ethiopian traditions and craftsmanship in every piece we create.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community First',
      description: 'Supporting local artisans and preserving traditional weaving techniques.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Quality & Authenticity',
      description: 'Handcrafted with care using authentic materials and time-honored methods.',
    },
  ];

  return (
    <>
      <Hero
        title="Our Story"
        subtitle="Celebrating Ethiopian heritage through modern, accessible fashion"
        backgroundImage="https://images.unsplash.com/photo-1634029878815-1bb307302471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjBoaWdobGFuZHMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY1Mjg0NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        height="medium"
      />

      <Section title="Who We Are" backgroundColor="white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-[--warm-grey] mb-4">
              Azebot was born from a passion to share the beauty of Ethiopian traditional clothing with the world. Our name, meaning &quot;to connect&quot; in Amharic, reflects our mission to bridge cultures through fashion.
            </p>
            <p className="text-lg text-[--warm-grey] mb-4">
              We work directly with skilled artisans in Ethiopia who use traditional weaving techniques passed down through generations. Each habesha kemis, netela, and accessory is handcrafted with meticulous attention to detail.
            </p>
            <p className="text-lg text-[--warm-grey]">
              Our collection celebrates the vibrant tibeb embroidery, the pure cotton weaves, and the cultural significance behind every piece – making Ethiopian fashion accessible to everyone, everywhere.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1598122666068-59b41e0a3193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjB0cmFkaXRpb25hbCUyMGNsb3RoaW5nfGVufDF8fHx8MTc2NTI4NDU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Ethiopian traditional clothing"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section title="Our Values" backgroundColor="beige">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[--azebot-gold] text-white mb-6">
                {value.icon}
              </div>
              <h3 className="mb-3">{value.title}</h3>
              <p className="text-[--warm-grey]">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="The Artisans Behind Azebot" backgroundColor="white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1630861413071-a424a4d6d155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYW4lMjBjb2ZmZWUlMjBjZXJlbW9ueXxlbnwxfHx8fDE3NjUyODQ2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Ethiopian artisans at work"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="mb-6">Empowering Communities</h3>
            <p className="text-lg text-[--warm-grey] mb-4">
              Every purchase supports Ethiopian artisans and their families. We believe in fair wages, sustainable practices, and preserving traditional craftsmanship for future generations.
            </p>
            <p className="text-lg text-[--warm-grey] mb-6">
              Our artisan partners are masters of their craft, with skills honed over decades. From spinning cotton to intricate embroidery, they pour their heart and heritage into every piece.
            </p>
            <Link to="/shop">
              <Button variant="primary" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                Shop the Collection
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section backgroundColor="cream">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mb-6">Join the Azebot Community</h2>
          <p className="text-xl text-[--warm-grey] mb-8">
            When you wear Azebot, you&apos;re not just wearing beautiful clothing – you&apos;re celebrating culture, supporting artisans, and connecting with a global community that values heritage and craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}