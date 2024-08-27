"use client";

import { cn } from "@utils/common";
import { useState } from "react";

type ChipToggleProps = {
  label: string;
  onClick: () => void;
  clicked?: boolean;
};

const ChipToggle = ({ label, onClick, clicked }: ChipToggleProps) => {
  const [isActive, setIsActive] = useState(false);

  const className =
    clicked ?? isActive ? "bg-brand text-white" : "bg-transparent text-black";

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <button
      className={cn(
        className,
        "rounded-xl border border-brand px-2.5 py-1 text-xs"
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ChipToggle;
