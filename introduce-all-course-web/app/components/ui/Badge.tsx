import { cn } from "@utils/common";

import { Badge as PrimitiveBadge } from "@/components/ui/badge";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <PrimitiveBadge
      className={cn(
        "rounded-lg border-brand bg-white font-medium text-black hover:bg-white",
        className
      )}
    >
      {children}
    </PrimitiveBadge>
  );
};

export default Badge;
