import { useCreateQueryParams } from "@utils/common";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserSearch = () => {
  const [role, setRole] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const createQueryParams = useCreateQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    if (value === "ALL") {
      replace(createQueryParams({ queryText: inputRef.current?.value }));
      setRole("");
      return;
    }

    replace(
      createQueryParams({ role: value, queryText: inputRef.current?.value })
    );
    setRole(value);
  };

  const handleOnClick = () => {
    replace(
      createQueryParams({ role: role, queryText: inputRef.current?.value })
    );
  };

  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Select defaultValue="ALL" onValueChange={handleOnValueChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">전체</SelectItem>
          <SelectItem value="USER">일반</SelectItem>
          <SelectItem value="EXPERT">전문가</SelectItem>
          <SelectItem value="SUPER">어드민</SelectItem>
          <SelectItem value="MANAGER">매니저</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="실명, 닉네임, 이메일, 전화번호"
        className="w-80"
        ref={inputRef}
      />
      <Button onClick={() => handleOnClick()}>검색</Button>
    </div>
  );
};

export default UserSearch;
