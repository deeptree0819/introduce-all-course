import { create } from "zustand";

interface AdminModalState {
  open: boolean;
  state: {
    title: string;
    bodyText: string;
    primaryClick: () => void;
    secondaryClick?: () => void;
    primaryButtonText: string;
    secondaryButtonText?: string;
    onClose?: () => void;
  };
}

const initialState = {
  title: "",
  bodyText: "",
  primaryClick: () => {},
  secondaryClick: () => {},
  primaryButtonText: "",
  secondaryButtonText: "",
  onClose: () => {},
};

export const useAdminModalStore = create<AdminModalState>((set, get) => ({
  open: false,
  state: initialState,
}));
