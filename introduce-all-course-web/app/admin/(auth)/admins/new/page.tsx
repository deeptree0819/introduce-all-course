"use client";

import GoBackButton from "@/app/admin/components/GoBackButton";

import CreateAdminForm from "./components/CreateAdminForm";

const AdminAdminsNewPage = () => {
  return (
    <div className="relative flex h-full grow flex-col items-start space-y-5 p-5 pb-32">
      <GoBackButton />
      <div className="mx-5">
        <CreateAdminForm />
      </div>
    </div>
  );
};

export default AdminAdminsNewPage;
