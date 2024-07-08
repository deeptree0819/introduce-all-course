"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@utils/common";
import React from "react";

import { PaginationResponse } from "@/app/types/common";

import {
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeader,
  AdminTableRow,
} from "./admin-table";
import AdminTablePagination from "./AdminTablePagination";

interface AdminPaginatedTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  state?: Partial<TableState>;
  pagination?: PaginationResponse;
  className?: string;
}

export function AdminPaginatedTable<TData, TValue>({
  data,
  columns,
  state,
  pagination,
  className = "",
}: AdminPaginatedTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        "flex flex-col overflow-x-auto rounded-lg border",
        className
      )}
    >
      <AdminTable>
        <AdminTableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <AdminTableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <AdminTableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </AdminTableHead>
                );
              })}
            </AdminTableRow>
          ))}
        </AdminTableHeader>
        <AdminTableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <AdminTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <AdminTableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </AdminTableCell>
                ))}
              </AdminTableRow>
            ))
          ) : (
            <AdminTableRow>
              <AdminTableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                데이터가 없습니다.
              </AdminTableCell>
            </AdminTableRow>
          )}
        </AdminTableBody>
      </AdminTable>
      {pagination && <AdminTablePagination pagination={pagination} />}
    </div>
  );
}

export default AdminPaginatedTable;
