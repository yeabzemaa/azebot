import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from './Container';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButtons?: Array<{ text: string; href: string; variant?: 'primary' | 'secondary' | 'outline' }>;
  height?: 'small' | 'medium' | 'large';
}

export function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaButtons = [],
  height = 'large',
}: HeroProps) {
  const heights = {
    small: 'h-64 md:h-80',
    medium: 'h-96 md:h-[32rem]',
    large: 'h-[70vh] md:h-[80vh]',
  };

  return (
    <section className={`relative ${heights[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Ethiopian Pattern Overlay */}
      <div className="absolute inset-0 pattern-overlay opacity-20 pointer-events-none" />

      {/* Content */}
      <Container className="relative z-10 text-center text-white">
        <h1 className="mb-6 text-balance drop-shadow-lg font-elegant">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-balance opacity-95 drop-shadow-md">
          {subtitle}
        </p>

        {ctaButtons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaButtons.map((button, index) => (
              <Link key={index} to={button.href}>
                <Button
                  variant={button.variant || 'primary'}
                  size="lg"
                  className="min-w-[200px] hover-lift"
                >
                  {button.text}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </Container>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-ethiopian opacity-80" />
    </section>
  );
}