import { useOnlyAdminPublicRoute } from "@lib/auth";

import LoginForm from "./login-form";

const AdminLoginPage = () => {
  useOnlyAdminPublicRoute();
  return (
    <div className="m-auto flex size-full min-h-screen max-w-lg flex-col items-center justify-center space-y-14">
      <h1 className="text-2xl">로봇다이브 V1</h1>
      <LoginForm />
    </div>
  );
};
export default AdminLoginPage;
