import { PaginationResponse } from "@/app/types/common";

import { Pagination } from "./AdminPagination";

interface AdminTablePaginationProps<T> {
  pagination: PaginationResponse;
}

const AdminTablePagination = <T,>({
  pagination,
}: AdminTablePaginationProps<T>) => {
  return (
    <Pagination>
      <Pagination.Label
        count={pagination.currentItemCount || 0}
        total={pagination.totalItemCount || 0}
      />
      <Pagination.Nav total={pagination.totalItemCount || 0} />
    </Pagination>
  );
};

export default AdminTablePagination;
