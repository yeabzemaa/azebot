'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FilterState, Size } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function ProductFilter({
  filters,
  onFilterChange,
  onClose,
  isMobile = false,
}: ProductFilterProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync with parent state (e.g. URL params)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const categories = [
    { value: 'women', label: 'Women' },
    { value: 'men', label: 'Men' },
    { value: 'kids', label: 'Kids' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const types = [
    { value: 'dress', label: 'Dresses' },
    { value: 'shirt', label: 'Shirts & Tunics' },
    { value: 'pants', label: 'Pants' },
    { value: 'scarf', label: 'Scarves' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'other', label: 'Other' },
  ];

  const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleCategoryToggle = (category: string) => {
    const updated = localFilters.categories.includes(category)
      ? localFilters.categories.filter(c => c !== category)
      : [...localFilters.categories, category];
    setLocalFilters({ ...localFilters, categories: updated });
  };

  const handleTypeToggle = (type: string) => {
    const updated = localFilters.types.includes(type)
      ? localFilters.types.filter(t => t !== type)
      : [...localFilters.types, type];
    setLocalFilters({ ...localFilters, types: updated });
  };

  const handleSizeToggle = (size: Size) => {
    const updated = localFilters.sizes.includes(size)
      ? localFilters.sizes.filter(s => s !== size)
      : [...localFilters.sizes, size];
    setLocalFilters({ ...localFilters, sizes: updated });
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const updated: [number, number] = [...localFilters.priceRange];
    updated[index] = value;
    setLocalFilters({ ...localFilters, priceRange: updated });
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    if (onClose) onClose();
  };

  const handleClearAll = () => {
    const emptyFilters: FilterState = {
      categories: [],
      types: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
    };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3>Filters</h3>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-[--linen-beige] rounded-full">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.categories.includes(category.value)}
                onChange={() => handleCategoryToggle(category.value)}
                className="w-4 h-4 rounded border-[--warm-grey]/30 text-[--azebot-gold] focus:ring-[--azebot-gold]"
              />
              <span className="text-sm">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="mb-6">
        <h4 className="mb-3">Product Type</h4>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.types.includes(type.value)}
                onChange={() => handleTypeToggle(type.value)}
                className="w-4 h-4 rounded border-[--warm-grey]/30 text-[--azebot-gold] focus:ring-[--azebot-gold]"
              />
              <span className="text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h4 className="mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1.5 text-sm rounded border-2 transition-colors ${localFilters.sizes.includes(size)
                ? 'border-[--azebot-gold] bg-[--azebot-gold] text-white'
                : 'border-[--warm-grey]/30 hover:border-[--azebot-gold] hover:text-[--azebot-gold]'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="mb-3">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="500"
            value={localFilters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-[--warm-grey]">
            <span>${localFilters.priceRange[0]}</span>
            <span>${localFilters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="primary" className="w-full" onClick={handleApply}>
          Apply Filters
        </Button>
        <Button variant="ghost" className="w-full" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
}
