import { create } from "zustand"

export interface ShopCartState {
  items: number[],
  addItem: () => void,
}

export const useShopCart = create<ShopCartState>((set)=> ({
  items: [],
  addItem: () => set((state) => {
    const newItems = [...state.items, 1];
    return {
      items: newItems,
    }
  })
}))
