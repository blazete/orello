import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (newItem) => set((state) => {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );
    if (existingItemIndex > -1) {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
      return { items: updatedItems };
    }
    return { items: [...state.items, newItem] };
  }),
  removeFromCart: (id, size) => set((state) => ({
    items: state.items.filter((item) => !(item.id === id && item.size === size))
  })),
  updateQuantity: (id, size, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id && item.size === size 
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    )
  })),
  cartTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  cartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));
