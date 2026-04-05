"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

function storageKey(userId: string | undefined) {
  return userId ? `yeso_cart_${userId}` : "yeso_cart_guest";
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [items, setItems] = useState<CartItem[]>([]);
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  // Cuando cambia el usuario (login / logout) carga su carrito propio
  useEffect(() => {
    const key = storageKey(userId);
    if (key === currentKey) return; // nada cambió

    // Guardar carrito actual antes de cambiar de usuario
    if (currentKey) {
      try {
        localStorage.setItem(currentKey, JSON.stringify(items));
      } catch { /* noop */ }
    }

    // Cargar carrito del nuevo usuario
    try {
      const stored = localStorage.getItem(key);
      setItems(stored ? JSON.parse(stored) : []);
    } catch {
      setItems([]);
    }

    setCurrentKey(key);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Persistir en localStorage cada vez que cambia el carrito
  useEffect(() => {
    if (!currentKey) return;
    try {
      localStorage.setItem(currentKey, JSON.stringify(items));
    } catch { /* noop */ }
  }, [items, currentKey]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
