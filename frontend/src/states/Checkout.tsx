import { create } from "zustand";

export type CheckoutState = {
  isCheckoutOpen: boolean,
  closeCheckout: () => void,
  openCheckout: () => void,
}

export const useCheckout = create<CheckoutState>((set) => ({
  isCheckoutOpen: false,
  closeCheckout: () => set(() => ({ isCheckoutOpen: false })),
  openCheckout: () => set(()=> ({isCheckoutOpen: true}))
}))
