'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types';
import { PRODUCTS, CATEGORIES, getProductsByCategory, searchProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import ProductDetailModal from './ProductDetailModal';

interface CatalogSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export default function CatalogSheet({ isOpen, onClose, onOpenCart }: CatalogSheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { cart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return searchProducts(searchQuery);
    }
    return getProductsByCategory(activeCategory);
  }, [searchQuery, activeCategory]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible && isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sheet - Desktop: centered modal, Mobile: bottom sheet */}
      <div
        className={`absolute bg-white overflow-hidden transition-all duration-300 ease-out
          /* Mobile */
          bottom-0 left-0 right-0 rounded-t-[32px] h-[94vh]
          /* Desktop */
          md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
          md:rounded-3xl md:h-[90vh] md:w-[90vw] md:max-w-5xl
          ${isVisible && isOpen ? 'translate-y-0 md:scale-100' : 'translate-y-full md:scale-95 md:translate-y-0'}`}
      >
        {/* Handle - Mobile only */}
        <div className="md:hidden sticky top-0 z-20 bg-white pt-3 pb-2">
          <div className="swipe-indicator" />
        </div>

        {/* Header */}
        <div className="bg-white sticky top-0 md:top-0 z-10 px-4 md:px-6 pb-3 pt-2 md:pt-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop</h2>
              <p className="text-sm text-gray-500">{PRODUCTS.length} products available</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={onOpenCart}
                className="relative w-12 h-12 bg-gradient-to-br from-[#00C896] to-[#00A87A] text-white rounded-2xl flex items-center justify-center shadow-md touch-scale hover:shadow-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cart.itemCount}
                  </span>
                )}
              </button>
              {/* Close */}
              <button
                onClick={handleClose}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center touch-scale transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Categories */}
        <div className="bg-white">
          <CategoryTabs
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={(cat) => {
              setActiveCategory(cat);
              setSearchQuery('');
            }}
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(94vh-200px)] md:h-[calc(90vh-200px)] bg-gray-50">
          <div className="px-4 md:px-6 pb-32">
            {/* Promo */}
            <div className="my-4">
              <div className="relative bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl p-5 md:p-6 overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-2">
                    LIMITED TIME
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-1">Free Delivery</h3>
                  <p className="text-white/80 text-sm md:text-base">On orders over €25 + earn 2x reward points</p>
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute right-16 top-0 w-20 h-20 bg-white/10 rounded-full" />
                <div className="absolute right-4 top-4 text-4xl animate-float">💊</div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : activeCategory === 'all'
                  ? 'All Products'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </h3>
              <span className="text-sm text-gray-500">{filteredProducts.length} items</span>
            </div>

            {/* Grid - Responsive */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">No products found</h4>
                <p className="text-gray-500 text-sm">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Bar */}
        {cart.itemCount > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-white/95 backdrop-blur-lg border-t border-gray-100 safe-bottom">
            <button
              onClick={onOpenCart}
              className="w-full py-4 btn-primary rounded-2xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="font-bold">View Cart</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                {cart.itemCount} items • €{cart.total.toFixed(2)}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
