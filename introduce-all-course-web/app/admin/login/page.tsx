import { useOnlyAdminPublicRoute } from "@lib/auth";

import LoginForm from "./login-form";

const AdminLoginPage = () => {
  useOnlyAdminPublicRoute();
  return (
    <div className="m-auto flex h-full min-h-screen w-full max-w-lg flex-col items-center justify-center space-y-14">
      <h2>스타터에 오신것을 환영합니다.</h2>
      <LoginForm />
    </div>
  );
};
export default AdminLoginPage;
