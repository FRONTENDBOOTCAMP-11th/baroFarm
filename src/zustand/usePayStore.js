import { create } from "zustand";

const usePayStore = create((set) => ({
  payData: null,
  setPayData: (payData) => set({ payData }),
  resetPayData: () => set({ payData: null }),
}));

export default usePayStore;
