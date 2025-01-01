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
import { VIEW_PER_PAGE } from "@/constants";
import useDebounce from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-query-params";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "./pagination";
import { Input } from "./ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearchInput?: boolean;
  searchInputPlaceholder?: string;
  dataCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showSearchInput,
  searchInputPlaceholder = "Search here",
  dataCount = 1,
}: DataTableProps<TData, TValue>) {
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

  const totalPages = Math.ceil(dataCount / VIEW_PER_PAGE);

  return (
    <div className="mt-4">
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
      </div>
      <div className="mt-4 rounded-md border bg-background">
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
      {totalPages > 1 && <Pagination className="mt-4" maxPages={totalPages} />}
    </div>
  );
}
