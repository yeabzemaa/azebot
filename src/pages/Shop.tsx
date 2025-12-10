'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilter } from '@/components/product/ProductFilter';
import { ProductSort } from '@/components/product/ProductSort';
import { Button } from '@/components/ui/Button';
import { filterProducts, sortProducts, getAllProducts } from '@/lib/products';
import { FilterState } from '@/lib/types';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    types: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Update filters when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, categories: [categoryParam] }));
    }
  }, [categoryParam]);

  const filteredProducts = filterProducts(filters);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen bg-[--soft-cream]">
      {/* Page Header */}
      <div className="bg-white border-b border-[--linen-beige]">
        <Container>
          <div className="py-8">
            <h1 className="mb-2">Shop</h1>
            <p className="text-[--warm-grey]">
              Discover our collection of authentic Ethiopian clothing
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilter
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Filter className="w-4 h-4" />}
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden"
                >
                  Filters
                </Button>
                <p className="text-sm text-[--warm-grey]">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              <ProductSort currentSort={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Products Grid */}
            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl overflow-hidden">
            <ProductFilter
              filters={filters}
              onFilterChange={setFilters}
              onClose={() => setMobileFilterOpen(false)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  );
}
