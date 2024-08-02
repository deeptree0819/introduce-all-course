import GoBackButton from "@/app/admin/components/GoBackButton";

import CreateMainBannerForm from "./components/CreateMainBannerForm";

const AdminEventPostsNewPage = () => {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex grow flex-col items-start space-y-5 p-5 pb-32">
        <GoBackButton />
        <div className="mx-5">
          <CreateMainBannerForm />
        </div>
      </div>
    </div>
  );
};

export default AdminEventPostsNewPage;
