"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoadingStore } from "@/hooks/use-loading-store";
import { useQueryParams } from "@/hooks/use-query-params";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Pagination } from "./pagination";
import { SearchInput } from "./search-input";
import { Button } from "./ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearchInput?: boolean;
  searchInputPlaceholder?: string;
  pagesDataCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showSearchInput,
  searchInputPlaceholder,
  pagesDataCount,
}: DataTableProps<TData, TValue>) {
  const { isLoading } = useLoadingStore();
  const { setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-5 flex-wrap">
          {showSearchInput && (
            <SearchInput placeholder={searchInputPlaceholder} />
          )}
          {!!searchParams.size && (
            <Button
              onClick={() =>
                setQueryParams({ query: {}, clearCurrentQuery: true })
              }
              variant="outline"
            >
              Reset Filers
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
                              header.getContext()
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
                          cell.getContext()
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
          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-neutral-950/5 z-[9999]">
              <Loader2 className="size-10 text-primary animate-spin" />
            </div>
          )}
        </div>
        {!!pagesDataCount && <Pagination dataCount={pagesDataCount} />}
      </div>
  );
}
