import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserSearchProps = {
  dummy?: string;
};

const UserSearch = ({}: UserSearchProps) => {
  return (
    <div className="flex w-full items-center justify-end space-x-2">
      <Select defaultValue="ALL">
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
      <Input placeholder="실명, 닉네임, 이메일, 전화번호" className="w-80" />
      <Button>검색</Button>
    </div>
  );
};

export default UserSearch;
