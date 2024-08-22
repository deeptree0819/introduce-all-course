import { useUpdateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EventSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const updateQueryParams = useUpdateQueryParams();
  const { replace } = useRouter();

  const handleClick = (value: string) => {
    replace(updateQueryParams({ queryText: value }));
  };

  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Input placeholder="공고명, 주최기관" className="w-80" ref={inputRef} />
      <Button onClick={() => handleClick(inputRef.current?.value ?? "")}>
        검색
      </Button>
    </div>
  );
};

export default EventSearch;
