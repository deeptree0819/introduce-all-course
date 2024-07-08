import AdminModal from "./components/modal/AdminModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminModal />
      {children}
    </div>
  );
}
