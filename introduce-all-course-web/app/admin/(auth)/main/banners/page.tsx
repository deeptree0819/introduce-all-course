import MainBannerTable from "./components/MainBannerTable";

const AdminMainBannersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">메인페이지 배너 관리</p>
      <MainBannerTable />
    </div>
  );
};

export default AdminMainBannersPage;
