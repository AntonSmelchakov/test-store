import { create } from "zustand"
import type { ShopCartItem } from "@test-store/shared"
import { persist } from "zustand/middleware"
import { createJSONStorage } from "zustand/middleware"

export type ShopCartState = {
  items: Map<number, ShopCartItem>,
  totalPrice: number,
  setTotalPrice: (totalPrice: number) => void,
  setState: (newState: Map<number, ShopCartItem>) => void,
  addItem: (id: number) => void,
  removeItem: (id:number) => void,
}

export const useShopCart = create<ShopCartState>()(
  persist(
    (set) => ({
      items: new Map(),
      totalPrice: 0,
      setTotalPrice: (totalPrice: number) => set(()=> ({totalPrice: totalPrice})),
      setState: (newState: Map<number, ShopCartItem>) => set(() => {
        return {items: newState}
      }),
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
        return {items: state.items}
      }),
      removeItem: (id: number) => set((state) => {
        const item = state.items.get(id);
        item.quantity -= 1;
        if (item.quantity <= 0) state.items.delete(id);
        return {items: state.items}
      })
    }),
    {
       name: 'shopcart',
       storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: Array.from(state.items.entries()),
        totalPrice: state.totalPrice}),
       merge: (persisted: any, current) => ({
         ...current,
         items: new Map(persisted?.items ?? []),
         totalPrice: persisted.totalPrice,
       }),
     }
  )
)
