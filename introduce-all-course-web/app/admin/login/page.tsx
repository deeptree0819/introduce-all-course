import { useOnlyAdminPublicRoute } from "@lib/auth";

import LoginForm from "./login-form";

const AdminLoginPage = () => {
  useOnlyAdminPublicRoute();
  return (
    <div className="m-auto flex h-full min-h-screen w-full max-w-lg flex-col items-center justify-center space-y-14">
      <h1 className="text-2xl">인트로듀스올코스</h1>
      <LoginForm />
    </div>
  );
};
export default AdminLoginPage;
