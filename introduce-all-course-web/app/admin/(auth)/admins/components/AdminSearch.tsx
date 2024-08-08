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

type AdminSearchProps = {
  dummy?: string;
};

const AdminSearch = ({}: AdminSearchProps) => {
  const [role, setRole] = useState<string>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);

  const createQueryParams = useCreateQueryParams();
  const { replace } = useRouter();

  const handleOnValueChange = (value: string) => {
    if (value === "ALL") {
      replace(createQueryParams({ queryText: inputRef.current?.value }));
      return;
    }

    replace(
      createQueryParams({ role: value, queryText: inputRef.current?.value })
    );
    setRole(value);
  };

  const handleOnClick = () => {
    replace(createQueryParams({ role, queryText: inputRef.current?.value }));
  };

  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Select defaultValue="ALL" onValueChange={handleOnValueChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">전체</SelectItem>
          <SelectItem value="SUPER">어드민</SelectItem>
          <SelectItem value="MANAGER">매니저</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="이름, 이메일" className="w-80" ref={inputRef} />
      <Button onClick={() => handleOnClick()}>검색</Button>
    </div>
  );
};

export default AdminSearch;
