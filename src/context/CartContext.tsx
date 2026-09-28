import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CustomPhotoStationeryConfig, ShippingDetails, PaymentDetails, OrderConfirmation } from '../types';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  promoCode: string;
  discount: number;
  total: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  lastAddedItem: CartItem | null;
  orders: OrderConfirmation[];
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  completeOrder: (shipping: ShippingDetails, payment: PaymentDetails) => OrderConfirmation;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ms_diy_cart_v2';
const ORDERS_STORAGE_KEY = 'ms_diy_orders_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const uniqueId = newItem.customPhotoConfig
      ? `${newItem.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
      : newItem.productId;

    setCart((prev) => {
      // Check if standard identical item exists
      if (!newItem.customPhotoConfig) {
        const existingIndex = prev.findIndex((item) => item.productId === newItem.productId && !item.customPhotoConfig);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += newItem.quantity;
          setLastAddedItem(updated[existingIndex]);
          return updated;
        }
      }

      const itemWithId: CartItem = { ...newItem, id: uniqueId };
      setLastAddedItem(itemWithId);
      return [itemWithId, ...prev];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CUTE10' || clean === 'WELCOME10' || clean === 'MSDIY10') {
      setPromoCode(clean);
      setDiscountPercent(0.1); // 10% discount
      return { success: true, message: '🎉 10% MS.DIY cute coupon applied!' };
    }
    if (clean === 'KIDS15' || clean === 'STUDENT15' || clean === 'DIYFUN15') {
      setPromoCode(clean);
      setDiscountPercent(0.15); // 15% discount
      return { success: true, message: '🌟 15% Young Creator & Student discount applied!' };
    }
    return { success: false, message: 'Invalid code. Try "MSDIY10" or "KIDS15"!' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = Number((cartSubtotal * discountPercent).toFixed(2));
  const total = Number((cartSubtotal - discount).toFixed(2));

  const completeOrder = (shipping: ShippingDetails, payment: PaymentDetails): OrderConfirmation => {
    const orderNumber = `DIY-${Math.floor(100000 + Math.random() * 900000)}`;
    const shippingCost = shipping.deliveryMethod === 'express' ? 9.5 : cartSubtotal >= 40 ? 0 : 4.5;
    const finalTotal = Number((cartSubtotal - discount + shippingCost).toFixed(2));

    const confirmation: OrderConfirmation = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount,
      shipping: shippingCost,
      total: finalTotal,
      shippingDetails: shipping,
    };

    setOrders((prev) => [confirmation, ...prev]);
    clearCart();
    return confirmation;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        promoCode,
        discount,
        total,
        isCartOpen,
        isCheckoutOpen,
        lastAddedItem,
        orders,
        setIsCartOpen,
        setIsCheckoutOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        completeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
