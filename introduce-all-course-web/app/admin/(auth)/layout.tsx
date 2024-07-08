import AdminSidebarNav from "../components/AdminSidebarNav";

interface Props {
  children: React.ReactNode;
}

export default function AdminAuthLayout(props: Props) {
  const { children } = props;
  // TODO: 퍼블리싱 작업자를 위해 우선 주석처리 추후에 주석 삭제 필요
  // useOnlyAdminRoute();
  return (
    <div className="flex">
      <AdminSidebarNav />
      <div className="h-screen flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
