import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  showNumber = false,
  size = 'md',
  className,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const filled = rating >= starValue;
          const partial = rating > index && rating < starValue;
          const fillPercentage = partial ? ((rating - index) * 100) : 0;

          return (
            <div key={index} className="relative">
              {partial ? (
                <>
                  <Star className={cn(sizes[size], 'text-[--warm-grey]')} />
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${fillPercentage}%` }}
                  >
                    <Star className={cn(sizes[size], 'fill-[--azebot-gold] text-[--azebot-gold]')} />
                  </div>
                </>
              ) : (
                <Star
                  className={cn(
                    sizes[size],
                    filled
                      ? 'fill-[--azebot-gold] text-[--azebot-gold]'
                      : 'text-[--warm-grey]'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm text-[--warm-grey] ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
