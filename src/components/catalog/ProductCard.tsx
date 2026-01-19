'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onSelect, index = 0 }: ProductCardProps) {
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);
  const isOutOfStock = product.stock_status === 'out_of_stock';
  const isLowStock = product.stock_status === 'low_stock';
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="product-card bg-white rounded-3xl overflow-hidden cursor-pointer animate-fade-in-up touch-scale"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 skeleton" />}
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`product-image object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="badge bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] px-2 py-1">
              -{discountPercent}%
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="badge bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] px-2 py-1">
              BEST
            </span>
          )}
          {product.requires_prescription && (
            <span className="badge bg-blue-500 text-white text-[10px] px-2 py-1">
              Rx
            </span>
          )}
        </div>

        {/* Stock Badge */}
        {(isOutOfStock || isLowStock) && (
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`badge text-[10px] px-2 py-1 ${
                isOutOfStock
                  ? 'bg-gray-900 text-white'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {isOutOfStock ? 'Sold out' : `${product.stock_quantity} left`}
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        {!inCart && !isOutOfStock && (
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 w-11 h-11 bg-white text-[#00C896] rounded-2xl shadow-lg flex items-center justify-center transition-all hover:bg-[#00C896] hover:text-white active:scale-90 ${
              isAdding ? 'animate-bounce' : ''
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}

        {/* Quantity Controls */}
        {inCart && (
          <div className="absolute bottom-3 right-3 flex items-center bg-white rounded-2xl shadow-lg overflow-hidden">
            <button
              onClick={handleDecrement}
              className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              {quantity === 1 ? (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                </svg>
              )}
            </button>
            <span className="w-8 text-center font-bold text-sm text-gray-900">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-9 h-9 flex items-center justify-center text-[#00C896] hover:bg-green-50 active:bg-green-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Brand */}
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate-2 mb-1 min-h-[40px]">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
            <span className="text-[10px] text-gray-400">({product.reviews_count})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">
            {product.currency}{product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {product.currency}{product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
