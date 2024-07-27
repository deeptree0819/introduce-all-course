import AdminTable from "./components/AdminTable";

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">어드민정보 관리</p>
      <AdminTable />
    </div>
  );
};

export default AdminUsersPage;
