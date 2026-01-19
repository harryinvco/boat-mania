'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import { PRODUCTS, CATEGORIES, getProductsByCategory, searchProducts } from '@/data/products';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import ProductDetailModal from './ProductDetailModal';

interface CatalogViewProps {
  onProductSelect?: (product: Product) => void;
}

export default function CatalogView({ onProductSelect }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery);
    }
    return getProductsByCategory(activeCategory);
  }, [searchQuery, activeCategory]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    onProductSelect?.(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 shadow-sm">
        {/* Top Bar */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h1 className="text-xl font-bold text-gray-900">PharmaCare+</h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Rewards Badge */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-white">2,450</span>
              </button>
              {/* Notification */}
              <button className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>

          {/* Search */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Categories */}
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelect={(cat) => {
            setActiveCategory(cat);
            setSearchQuery('');
          }}
        />
      </header>

      {/* Promo Banner */}
      <div className="px-4 py-4">
        <div className="relative bg-gradient-to-r from-[#00b37e] to-[#00996b] rounded-2xl p-5 overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block px-2 py-0.5 bg-white/20 text-white text-xs font-semibold rounded-full mb-2">
              LIMITED OFFER
            </span>
            <h3 className="text-white text-lg font-bold mb-1">
              Free Delivery on Orders Over €25
            </h3>
            <p className="text-white/80 text-sm mb-3">
              Plus earn 2x loyalty points this week
            </p>
            <button className="px-4 py-2 bg-white text-[#00b37e] font-semibold rounded-full text-sm hover:bg-gray-50 transition-colors">
              Shop Now
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute right-12 -top-4 w-20 h-20 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : activeCategory === 'all'
              ? 'All Products'
              : CATEGORIES.find((c) => c.id === activeCategory)?.name}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredProducts.length} items
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={handleProductSelect}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
