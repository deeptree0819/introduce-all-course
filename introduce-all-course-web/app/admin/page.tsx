import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) redirect("/admin/users");
  if (!token) redirect("/admin/login");
};
export default AdminPage;
