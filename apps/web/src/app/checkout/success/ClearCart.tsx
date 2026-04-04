"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export function ClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  // Solo al montar — pago ya confirmado
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
