'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, CartItem, Cart } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  const calculateTotals = (items: CartItem[]): { total: number; itemCount: number } => {
    return items.reduce(
      (acc, item) => ({
        total: acc.total + item.product.price * item.quantity,
        itemCount: acc.itemCount + item.quantity,
      }),
      { total: 0, itemCount: 0 }
    );
  };

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.items.findIndex((item) => item.product.id === product.id);

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = prev.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { product, quantity }];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => item.product.id !== productId);
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        const newItems = prev.items.filter((item) => item.product.id !== productId);
        const { total, itemCount } = calculateTotals(newItems);
        return { items: newItems, total, itemCount };
      }

      const newItems = prev.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { items: newItems, total, itemCount };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0, itemCount: 0 });
  }, []);

  const isInCart = useCallback(
    (productId: string) => cart.items.some((item) => item.product.id === productId),
    [cart.items]
  );

  const getItemQuantity = useCallback(
    (productId: string) => {
      const item = cart.items.find((item) => item.product.id === productId);
      return item?.quantity || 0;
    },
    [cart.items]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
