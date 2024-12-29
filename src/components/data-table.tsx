"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebounce from "@/hooks/use-debounce";
import { ModalType, useModalStore } from "@/hooks/use-modal-store";
import { useQueryParams } from "@/hooks/use-query-params";
import { Member } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Pagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearchInput?: boolean;
  searchInputPlaceholder?: string;
  deleteModalType?: ModalType;
  totalPage?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showSearchInput,
  searchInputPlaceholder = "Search here",
  deleteModalType,
  totalPage,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      columnFilters,
    },
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const setQueryParams = useQueryParams();
  const debouncedValue = useDebounce(searchQuery, 500);
  const { onOpen } = useModalStore();
  const showDeleteButton = table.getSelectedRowModel().rows.length > 0;
  const showEditButton = table.getSelectedRowModel().rows.length === 1;

  const showResetButton =
    !!table.getSelectedRowModel().rows.length || !!searchParams.size;

  useEffect(() => {
    if (debouncedValue === undefined) return;
    if (debouncedValue === "") {
      return setQueryParams({ query: { q: "" } });
    }
    setQueryParams({
      query: {
        q: debouncedValue,
      },
      clearCurrentQuery: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-3">
        {showSearchInput && (
          <Input
            ref={searchInputRef}
            type="text"
            placeholder={searchInputPlaceholder}
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        )}
        {showResetButton && (
          <Button
            variant="outline"
            onClick={() => {
              table.resetRowSelection();
              setQueryParams({ query: {}, clearCurrentQuery: true });
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        )}
        {showDeleteButton && deleteModalType && (
          <Button
            onClick={() => {
              const selectedIds = table
                .getSelectedRowModel()
                .rows.map((row) => (row.original as Member).id);
              onOpen(deleteModalType, { ids: selectedIds });
            }}
            variant="destructive"
          >
            Delete
          </Button>
        )}
        {showEditButton && (
          <Button
            onClick={() => {
              const id = (
                table.getSelectedRowModel().rows[0].original as Member
              ).id;
              router.push(`/membership-plans/edit/${id}`);
            }}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!!totalPage && totalPage > 10 && <Pagination maxPages={totalPage} />}
    </div>
  );
}
