import { useUpdateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FreeLecturePostsSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const updateQueryParams = useUpdateQueryParams();
  const { replace } = useRouter();

  const handleClick = (value: string) => {
    replace(updateQueryParams({ queryText: value }));
  };

  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Input
        placeholder="무료강의 제목, 유튜브 링크"
        className="w-80"
        ref={inputRef}
      />
      <Button onClick={() => handleClick(inputRef.current?.value ?? "")}>
        검색
      </Button>
    </div>
  );
};

export default FreeLecturePostsSearch;
