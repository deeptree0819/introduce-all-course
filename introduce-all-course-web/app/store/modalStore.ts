import { create } from "zustand";

interface ModalState {
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

export const useModalStore = create<ModalState>((set, get) => ({
  open: false,
  state: initialState,
}));
