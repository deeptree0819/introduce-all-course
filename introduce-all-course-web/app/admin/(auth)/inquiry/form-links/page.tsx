import { Label } from "@/components/ui/label";

import FormLinkAddInputField from "./components/FormLinkAddInputField";
import FormLinksTable from "./components/FormLinksTable";

const AdminFormLinksPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">상담신청 링크 관리</p>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="form-link">현재 선택된 링크</Label>
        <FormLinkAddInputField />
      </div>

      <div className="flex max-w-[1300px] flex-col space-y-5">
        <FormLinksTable />
      </div>
    </div>
  );
};

export default AdminFormLinksPage;
