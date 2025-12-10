import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backgroundColor?: 'cream' | 'beige' | 'white';
  className?: string;
  containerClassName?: string;
}

export function Section({
  children,
  title,
  subtitle,
  backgroundColor = 'cream',
  className,
  containerClassName,
}: SectionProps) {
  const bgColors = {
    cream: 'bg-[--soft-cream]',
    beige: 'bg-[--linen-beige]',
    white: 'bg-white',
  };

  return (
    <section className={cn('py-16 md:py-24', bgColors[backgroundColor], className)}>
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="mb-4 text-balance">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-[--warm-grey] max-w-2xl mx-auto text-balance">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
