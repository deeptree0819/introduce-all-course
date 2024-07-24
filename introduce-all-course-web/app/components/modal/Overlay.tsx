import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type OverlayProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Overlay = ({ children, onClose }: OverlayProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const overlayRoot = document.getElementById("overlay-root");

  if (!overlayRoot) {
    console.error("Overlay root element not found");
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/60"
      onClick={() => onClose()}
    >
      <X
        size={24}
        className="absolute right-4 top-4 cursor-pointer text-white"
      />
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    overlayRoot
  );
};

export default Overlay;
