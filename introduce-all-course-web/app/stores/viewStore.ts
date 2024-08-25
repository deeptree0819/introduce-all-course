import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ViewState {
  views: Record<string, number>;
  setView: (postId: string, timestamp: number) => void;
  getView: (postId: string) => number | undefined;
}

const useViewStore = create<ViewState>()(
  persist(
    (set, get) => ({
      views: {},

      setView: (postId: string, timestamp: number) =>
        set((state) => ({
          views: { ...state.views, [postId]: timestamp },
        })),

      getView: (postId: string) => get().views[postId],
    }),
    {
      name: "view-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useViewStore;
