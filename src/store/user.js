import { create } from "zustand";

export const useUserStore = create((set) => ({
  isFirstVisit: true,
  setFirstVisit: (value) => set({ isFirstVisit: value }),
  fields: [],
  setFields: (fields) => set({ fields }),
  directions: [],
  setDirections: (directions) => set({ directions }),
  keywords: [],
  setKeywords: (keywords) => set({ keywords }),
}));
