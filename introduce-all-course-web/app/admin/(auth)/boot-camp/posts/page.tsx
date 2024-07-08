import { Button } from "@components/ui/button";

import BootCampPostsTable from "./components/BootCampPostsTable";

const AdminUsersPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <p className="text-3xl">국비지원/부트캠프 게시글 및 댓글 관리</p>
      <div className="flex flex-col items-end space-y-2">
        <Button>게시글 작성</Button>
        <BootCampPostsTable />
      </div>
    </div>
  );
};

export default AdminUsersPage;
