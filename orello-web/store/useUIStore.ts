import { create } from 'zustand';

interface UIState {
  isNavOpen: boolean;
  isCartOpen: boolean;
  toggleNav: () => void;
  toggleCart: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavOpen: false,
  isCartOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen, isCartOpen: false })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isNavOpen: false })),
  closeAll: () => set({ isNavOpen: false, isCartOpen: false }),
}));
