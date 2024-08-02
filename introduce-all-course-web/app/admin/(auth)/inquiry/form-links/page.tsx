import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FormLinksTable from "./components/FormLinksTable";

const AdminFormLinksPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">상담신청 링크 관리</p>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">현재 선택된 링크</Label>
        <div className="flex w-full max-w-lg items-center space-x-2">
          <Input type="email" placeholder="Email" defaultValue={"tally.so"} />
          <Button type="submit">수정</Button>
        </div>
      </div>

      <div className="flex max-w-[1300px] flex-col space-y-5">
        <FormLinksTable />
      </div>
    </div>
  );
};

export default AdminFormLinksPage;
