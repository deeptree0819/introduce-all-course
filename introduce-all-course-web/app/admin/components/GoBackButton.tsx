"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const GoBackButton = () => {
  const { back } = useRouter();

  return (
    <Button onClick={() => back()} variant="ghost">
      <ChevronLeft className="-ml-2" />
      뒤로가기
    </Button>
  );
};

export default GoBackButton;
