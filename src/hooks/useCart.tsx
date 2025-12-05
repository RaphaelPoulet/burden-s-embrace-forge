import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  total: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error loading cart:", error);
    } else if (data) {
      setItems(data.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: Number(item.product_price),
        image: item.product_image,
        quantity: item.quantity,
      })));
    }
    setLoading(false);
  };

  const addItem = async (newItem: Omit<CartItem, "quantity">) => {
    if (!user) {
      toast({
        title: "Allegiance Required",
        description: "You must swear your allegiance to accept this burden.",
        variant: "destructive",
      });
      return;
    }

    const existing = items.find((item) => item.id === newItem.id);
    
    if (existing) {
      // Update quantity in database
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + 1 })
        .eq("user_id", user.id)
        .eq("product_id", newItem.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update cart.",
          variant: "destructive",
        });
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // Insert new item
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          product_id: newItem.id,
          product_name: newItem.name,
          product_price: newItem.price,
          product_image: newItem.image,
          quantity: 1,
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add item to cart.",
          variant: "destructive",
        });
        return;
      }

      setItems((prev) => [...prev, { ...newItem, quantity: 1 }]);
    }
    
    setCartOpen(true);
  };

  const removeItem = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", id);

    if (!error) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", user.id)
      .eq("product_id", id);

    if (!error) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (!error) {
      setItems([]);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartOpen,
        setCartOpen,
        total,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
