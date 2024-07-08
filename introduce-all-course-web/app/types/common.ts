export interface Paginated<T> {
  items: T[];
  pagination: PaginationResponse;
}

export interface PaginationResponse {
  totalItemCount: number;
  currentItemCount: number;
  totalPage: number;
  currentPage: number;
  itemsPerPage: number;
}

export interface PaginationDto {
  sort?: string;
  filter?: string;
  page?: number;
  itemsPerPage?: number;
}
