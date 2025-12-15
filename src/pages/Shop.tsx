'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilter } from '@/components/product/ProductFilter';
import { ProductSort } from '@/components/product/ProductSort';
import { Button } from '@/components/ui/Button';
import { sortProducts, getAllProducts } from '@/lib/products';
import { FilterState, Product } from '@/lib/types';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search'); // Capture search if present

  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    types: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
    search: searchParam || undefined
  });

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Update filters when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, categories: [categoryParam] }));
    }
  }, [categoryParam]);

  // Fetch products when filters change
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const fetchedProducts = await getAllProducts(filters);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      } finally {
        setLoading(false);
      }
    }

    // Debounce slightly to avoid rapid API calls on slider change
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  // Sort products client-side for now
  const sortedProducts = sortProducts(products, sortBy);

  return (
    <div className="min-h-screen bg-[--soft-cream]">
      {/* Page Header */}
      <div className="bg-white border-b border-[--linen-beige]">
        <Container>
          <div className="py-8">
            <h1 className="mb-2">Shop</h1>
            <p className="text-[--warm-grey]">
              {filters.categories.length > 0 ? `Browsing ${filters.categories.join(', ')}` : 'Discover our collection of authentic Ethiopian clothing'}
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
                  {loading ? 'Loading...' : `${sortedProducts.length} ${sortedProducts.length === 1 ? 'product' : 'products'}`}
                </p>
              </div>

              <ProductSort currentSort={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--azebot-gold]"></div>
              </div>
            ) : sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-[--linen-beige]">
                <p className="text-lg text-[--warm-grey]">No products found matching your criteria.</p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => setFilters({
                    categories: [],
                    types: [],
                    priceRange: [0, 500],
                    colors: [],
                    sizes: []
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            )}

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
