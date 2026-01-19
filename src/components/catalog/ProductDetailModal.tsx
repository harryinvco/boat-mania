'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const quantity = product ? getItemQuantity(product.id) : 0;
  const inCart = product ? isInCart(product.id) : false;
  const isOutOfStock = product?.stock_status === 'out_of_stock';
  const hasDiscount = product?.originalPrice && product.originalPrice > product.price;

  useEffect(() => {
    if (product) {
      setIsVisible(true);
      setImageLoaded(false);
    } else {
      setIsVisible(false);
    }
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!product) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] max-h-[92vh] overflow-hidden transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle */}
        <div className="sticky top-0 z-10 bg-white pt-3 pb-2">
          <div className="swipe-indicator" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center z-20 touch-scale"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto max-h-[calc(92vh-100px)]">
          {/* Image */}
          <div className="relative aspect-square bg-gray-100">
            {!imageLoaded && <div className="absolute inset-0 skeleton" />}
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="100vw"
                priority
              />
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hasDiscount && (
                <span className="badge bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5">
                  -{Math.round((1 - product.price / product.originalPrice!) * 100)}% OFF
                </span>
              )}
              {product.tags?.includes('bestseller') && (
                <span className="badge bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1.5">
                  BESTSELLER
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-xs text-[#00C896] font-semibold capitalize">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

            {/* Dosage */}
            {product.dosage && (
              <p className="text-gray-500 mb-3">{product.dosage}</p>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!)
                          ? 'text-amber-400 fill-current'
                          : 'text-gray-200 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-gray-900">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews_count} reviews)</span>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl mb-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  isOutOfStock
                    ? 'bg-red-500'
                    : product.stock_status === 'low_stock'
                    ? 'bg-amber-500 animate-pulse'
                    : 'bg-emerald-500'
                }`}
              />
              <span
                className={`font-semibold ${
                  isOutOfStock
                    ? 'text-red-600'
                    : product.stock_status === 'low_stock'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {isOutOfStock
                  ? 'Out of Stock'
                  : product.stock_status === 'low_stock'
                  ? `Only ${product.stock_quantity} left`
                  : 'In Stock'}
              </span>
            </div>

            {/* Prescription Badge */}
            {product.requires_prescription && (
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Prescription Required</p>
                  <p className="text-sm text-blue-600">Upload when checking out</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">About this product</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Active Ingredients */}
            {product.active_ingredients && product.active_ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Active Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.active_ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SKU */}
            <p className="text-xs text-gray-400">SKU: {product.sku}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 safe-bottom">
          <div className="flex items-center gap-4">
            {/* Price */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {product.currency}{product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.currency}{product.originalPrice?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Add/Quantity */}
            {!inCart ? (
              <button
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
                className={`flex-1 py-4 rounded-2xl font-bold text-white transition-all touch-scale ${
                  isOutOfStock
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            ) : (
              <div className="flex items-center bg-gray-100 rounded-2xl">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-14 h-14 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l-2xl transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-14 text-center font-bold text-xl text-gray-900">{quantity}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="w-14 h-14 flex items-center justify-center text-[#00C896] hover:bg-gray-200 rounded-r-2xl transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
