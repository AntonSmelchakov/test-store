import { create } from "zustand"
import type { ShopCartItem } from "@test-store/shared"

export type ShopCartState = {
  items: Map<number,ShopCartItem>,
  addItem: (id: number) => void,
  removeItem: (id:number) => void,
}

export const useShopCart = create<ShopCartState>((set) => ({
  items: new Map(),
  addItem: (id: number) => set((state) => {
    const item = state.items.get(id);
    if (item) {
      item.quantity += 1;
    }
    else {
      state.items.set(id, {
        id: id,
        quantity: 1,
      })
    }
    console.log(state.items);
    return {items: state.items}
  }),
  removeItem: (id: number) => set((state) => {
    const item = state.items.get(id);
    item.quantity -= 1;
    if (item.quantity <= 0) state.items.delete(id);
    return {items: state.items}
  })
}))
