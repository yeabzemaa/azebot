import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  onChange,
  error,
  icon,
  className,
  required,
  ...props
}: InputProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-sm">
          {label}
          {required && <span className="text-[--sacred-red] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[--warm-grey]">
            {icon}
          </div>
        )}
        <input
          {...props}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full px-4 py-2.5 rounded-md border border-[--warm-grey]/30 bg-white',
            'focus:outline-none focus:ring-2 focus:ring-[--azebot-gold] focus:border-transparent',
            'disabled:bg-[--linen-beige] disabled:cursor-not-allowed',
            'transition-all duration-200',
            icon && 'pl-10',
            error && 'border-[--sacred-red] focus:ring-[--sacred-red]',
            className
          )}
        />
      </div>
      {error && (
        <span className="text-sm text-[--sacred-red]">{error}</span>
      )}
    </div>
  );
}
