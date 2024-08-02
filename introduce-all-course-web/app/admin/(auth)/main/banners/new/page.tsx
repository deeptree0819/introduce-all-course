import GoBackButton from "@/app/admin/components/GoBackButton";
import { Button } from "@/components/ui/button";

import MainBannerInfoForm from "../components/MainBannerInfoForm";

const AdminEventPostsNewPage = () => {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex grow flex-col items-start space-y-5 p-5 pb-32">
        <GoBackButton />
        <div className="mx-5">
          <MainBannerInfoForm />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-end border-t border-slate-300 bg-white px-7 py-3 shadow">
        <Button>등록</Button>
      </div>
    </div>
  );
};

export default AdminEventPostsNewPage;
