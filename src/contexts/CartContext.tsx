import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedWeight?: string, unitMultiplier?: number, unitPrice?: number) => void;
  removeFromCart: (productId: string, selectedWeight?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedWeight?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1, selectedWeight = product.weight, unitMultiplier = 1, unitPrice?: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedWeight === selectedWeight);
      const price = unitPrice ?? Math.round(product.price * unitMultiplier);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedWeight === selectedWeight
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedWeight, unitMultiplier, unitPrice: price }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, selectedWeight?: string) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && (selectedWeight ? item.selectedWeight === selectedWeight : true))));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, selectedWeight?: string) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => !(item.product.id === productId && (selectedWeight ? item.selectedWeight === selectedWeight : true))));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && (selectedWeight ? item.selectedWeight === selectedWeight : true) ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice ?? item.product.price) * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal, shipping, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
