import GoBackButton from "@/app/admin/components/GoBackButton";
import { Button } from "@/components/ui/button";

import EventsPostForm from "./components/EventsPostForm";

const AdminBootCampPostsNewPage = () => {
  return (
    <div className="relative flex h-full flex-col">
      <div className="grow space-y-7 p-5 pb-32">
        <GoBackButton />
        <div className="mx-5">
          <EventsPostForm />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full flex-row items-center justify-end border-t border-slate-300 bg-white px-7 py-3 shadow">
        <Button>등록</Button>
      </div>
    </div>
  );
};

export default AdminBootCampPostsNewPage;
