"use client";

import { cn } from "@utils/common";
import { useState } from "react";

type ChipToggleProps = {
  label: string;
  onClick: () => void;
};

const ChipToggle = ({ label, onClick }: ChipToggleProps) => {
  const [isActive, setIsActive] = useState(false);

  const className = isActive
    ? "bg-brand text-white"
    : "bg-transparent text-black";

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <button
      className={cn(
        className,
        "rounded-xl border border-brand px-2 py-1.5 text-xs"
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ChipToggle;
