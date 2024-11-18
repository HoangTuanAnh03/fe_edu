"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LevelResponse } from "@/types/level";
import { useEffect, useState } from "react";
import CreateForm from "@/app/(manager)/levels/create-form";
import { useGetAllLevelQuery } from "@/queries/useLevel";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import DetailForm from "@/app/(manager)/levels/detail-form";

export const columns: ColumnDef<LevelResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "numTopics",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Num Topics
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numTopics")}</div>
    ),
  },
  {
    accessorKey: "numWords",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            className=""
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Num Words
            <ArrowUpDown />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="text-center">{row.getValue("numWords")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const currentRow = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(currentRow.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {/* </Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const id = searchParams.get("id") ? Number(searchParams.get("id")) : 0;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [open, setOpen] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [levelIdEdit, setLevelIdEdit] = useState<number>(0);
  const [levelDelete, setLevelDelete] = useState<LevelResponse | null>(null);

  const spec: IModelSpecificationRequest = {
    filter: "",
  };

  const pageAble: IModelPaginateRequest = {
    page: page - 1,
    size: pageSize,
    sort: [],
  };

  const { data, isLoading } = useGetAllLevelQuery(spec, pageAble);
  const levels: LevelResponse[] = data?.payload.data?.result ?? [];
  const pageTotal = data?.payload.data?.meta.pages ?? 1;

  useEffect(() => {
    // reset pageIndex when pageSize changes and blank
    if (page < 0 || page > pageTotal) router.push("/levels");
  }, [pageTotal]);

  const table = useReactTable({
    data: levels,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-3 flex-1 ">
          <Input
            placeholder="Filter name ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <CreateForm open={open} setOpen={setOpen} />
          <DetailForm id={id} open={id !== 0} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal />
              Views
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
            {isLoading &&
              Array(10)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    {table.getAllColumns().map((_, index) => (
                      <TableCell key={index} className="text-center">
                        <Skeleton className="h-[30px] rounded-md mt-1" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
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
              : !isLoading && (
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2 flex items-center text-sm gap-8">
          <div className="flex items-center gap-2">
            <span className="text-slate-800">Rows per page</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(Number(value))}
            >
              <SelectTrigger className="w-fit gap-2">
                {isLoading ? (
                  <Skeleton className=" h-6 w-8 rounded-md" />
                ) : (
                  <SelectValue placeholder={pageSize} />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <Skeleton className="h-[30px] w-[100px] rounded-md" />
          ) : (
            <div>
              Page {page} of {pageTotal}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" disabled={page < 2}>
              <Link href={`levels`} className="py-2 px-3">
                <ChevronsLeft />
              </Link>
            </Button>
            <Button variant="outline" size="icon" disabled={page < 2}>
              <Link href={`levels?page=${page - 1}`} className="py-2 px-3">
                <ChevronLeft />
              </Link>
            </Button>
            <Button variant="outline" size="icon" disabled={page >= pageTotal}>
              <Link href={`levels?page=${page + 1}`} className="py-2 px-3">
                <ChevronRight />
              </Link>
            </Button>
            <Button variant="outline" size="icon" disabled={page >= pageTotal}>
              <Link href={`levels?page=${pageTotal}`} className="py-2 px-3">
                <ChevronsRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
