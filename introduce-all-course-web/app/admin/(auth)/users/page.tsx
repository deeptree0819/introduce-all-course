import UserTable from "./components/UserTable";

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">회원정보 관리</p>
      <UserTable />
    </div>
  );
};

export default AdminUsersPage;
