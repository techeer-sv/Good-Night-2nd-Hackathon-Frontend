import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IsAdminState {
  isAdmin: boolean;
  toggleIsAdmin: (b: boolean) => void;
}

const useIsAdminStore = create<IsAdminState>()(
  persist(
    (set, get) => ({
      isAdmin: false,
      toggleIsAdmin: () => set(() => ({ isAdmin: !get().isAdmin })),
    }),
    {
      name: "isAdminStore",
    }
  )
);

export default useIsAdminStore;
