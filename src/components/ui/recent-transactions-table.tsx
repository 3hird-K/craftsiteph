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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type UserRow = {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  email: string;
  role: "ADMIN" | "DEVELOPER" | "DESIGNER" | "VIEWER";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  projects: number;
  lastActive: string;
};

const data: UserRow[] = [
  {
    id: "USR-001",
    name: "Koji Kiyotaka",
    avatarColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    initials: "KK",
    email: "koji.kiyotaka@craftsiteph.com",
    role: "ADMIN",
    status: "ACTIVE",
    projects: 47,
    lastActive: "Jun 27, 09:12 AM",
  },
  {
    id: "USR-002",
    name: "Maria Santos",
    avatarColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    initials: "MS",
    email: "maria.santos@craftsiteph.com",
    role: "DEVELOPER",
    status: "ACTIVE",
    projects: 31,
    lastActive: "Jun 27, 08:45 AM",
  },
  {
    id: "USR-003",
    name: "Carlos Reyes",
    avatarColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    initials: "CR",
    email: "carlos.reyes@craftsiteph.com",
    role: "DESIGNER",
    status: "ACTIVE",
    projects: 18,
    lastActive: "Jun 27, 07:30 AM",
  },
  {
    id: "USR-004",
    name: "Angela Cruz",
    avatarColor: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
    initials: "AC",
    email: "angela.cruz@craftsiteph.com",
    role: "DEVELOPER",
    status: "ACTIVE",
    projects: 22,
    lastActive: "Jun 26, 04:20 PM",
  },
  {
    id: "USR-005",
    name: "James Villanueva",
    avatarColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    initials: "JV",
    email: "james.v@craftsiteph.com",
    role: "VIEWER",
    status: "ACTIVE",
    projects: 5,
    lastActive: "Jun 26, 02:10 PM",
  },
  {
    id: "USR-006",
    name: "Rina Dela Peña",
    avatarColor: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
    initials: "RD",
    email: "rina.dp@craftsiteph.com",
    role: "DESIGNER",
    status: "INACTIVE",
    projects: 0,
    lastActive: "Jun 20, 11:00 AM",
  },
  {
    id: "USR-007",
    name: "Paolo Garcia",
    avatarColor: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
    initials: "PG",
    email: "paolo.garcia@craftsiteph.com",
    role: "VIEWER",
    status: "ACTIVE",
    projects: 8,
    lastActive: "Jun 27, 09:01 AM",
  },
  {
    id: "USR-008",
    name: "Sofia Lim",
    avatarColor: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
    initials: "SL",
    email: "sofia.lim@craftsiteph.com",
    role: "DEVELOPER",
    status: "SUSPENDED",
    projects: 0,
    lastActive: "Jun 10, 09:30 AM",
  },
];

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "USER",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${user.avatarColor}`}>
            {user.initials}
          </div>
          <div className="flex flex-col select-none">
            <span className="font-bold text-foreground hover:text-primary transition-colors text-xs">{user.name}</span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{user.id}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => (
      <span className="text-muted-foreground font-medium select-all">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      const dotColor =
        role === "ADMIN"
          ? "bg-purple-400"
          : role === "DEVELOPER"
          ? "bg-emerald-400"
          : role === "DESIGNER"
          ? "bg-amber-400"
          : "bg-blue-400";
      return (
        <Badge
          variant="outline"
          className="text-[10px] font-bold border-border/80 bg-background/50 px-2 py-0.5 rounded-lg flex items-center gap-1.5 w-fit"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const themeStyles =
        status === "ACTIVE"
          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
          : status === "INACTIVE"
          ? "bg-muted/50 text-muted-foreground border-border/60"
          : "bg-destructive/10 text-destructive border-destructive/20";
      return (
        <Badge
          variant="outline"
          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${themeStyles}`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "projects",
    header: "PROJECTS",
    cell: ({ row }) => (
      <span className="font-bold text-foreground font-mono">{row.getValue("projects")}</span>
    ),
  },
  {
    accessorKey: "lastActive",
    header: "LAST ACTIVE",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs">{row.getValue("lastActive")}</span>
    ),
  },
  {
    id: "actions",
    header: "MANAGE",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted/80 rounded-lg">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-xl">
            <DropdownMenuItem className="text-xs cursor-pointer">
              Edit role for {user.name}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs cursor-pointer text-destructive">
              Suspend user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function RecentTransactionsTable({ className }: { className?: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [roleFilter, setRoleFilter] = React.useState<string>("All Roles");
  const [statusFilter, setStatusFilter] = React.useState<string>("All Status");
  const [pageSize, setPageSize] = React.useState<number>(5);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Apply Role and Status custom filters dynamically
  React.useEffect(() => {
    if (roleFilter === "All Roles") {
      table.getColumn("role")?.setFilterValue(undefined);
    } else {
      table.getColumn("role")?.setFilterValue(roleFilter);
    }
  }, [roleFilter, table]);

  React.useEffect(() => {
    if (statusFilter === "All Status") {
      table.getColumn("status")?.setFilterValue(undefined);
    } else {
      table.getColumn("status")?.setFilterValue(statusFilter);
    }
  }, [statusFilter, table]);

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  return (
    <Card className={className}>
      <CardContent className="p-6 space-y-6">
        
        {/* Header Block matching your exact mockup layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 select-none">
            <h2 className="text-xl font-bold tracking-tight text-foreground">All Users</h2>
            <p className="text-xs text-muted-foreground font-medium">
              Manage accounts, roles, and access permissions for the craftsiteph system.
            </p>
          </div>

          {/* Filters Block */}
          <div className="flex flex-wrap items-center gap-3 ml-auto">
            
            {/* Search Input */}
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search name, email..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="pl-9 pr-4 h-9 text-xs rounded-xl bg-background/50 border-border/80 focus-visible:ring-primary focus-visible:border-primary w-52"
              />
            </div>

            {/* Role Selector Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 text-xs font-semibold rounded-xl gap-2 border-border/80 bg-background/50 transition-colors",
                    roleFilter !== "All Roles"
                      ? "border-primary/60 text-primary bg-primary/5 hover:bg-primary/10"
                      : "hover:bg-muted/80 hover:border-primary/30 hover:text-primary"
                  )}
                >
                  {roleFilter} <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36 rounded-xl">
                {["All Roles", "ADMIN", "DEVELOPER", "DESIGNER", "VIEWER"].map((role) => (
                  <DropdownMenuCheckboxItem
                    key={role}
                    checked={roleFilter === role}
                    onCheckedChange={() => setRoleFilter(role)}
                    className="text-xs cursor-pointer capitalize"
                  >
                    {role.toLowerCase()}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Selector Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-9 text-xs font-semibold rounded-xl gap-2 border-border/80 bg-background/50 transition-colors",
                    statusFilter !== "All Status"
                      ? "border-primary/60 text-primary bg-primary/5 hover:bg-primary/10"
                      : "hover:bg-muted/80 hover:border-primary/30 hover:text-primary"
                  )}
                >
                  {statusFilter} <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36 rounded-xl">
                {["All Status", "ACTIVE", "INACTIVE", "SUSPENDED"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter === status}
                    onCheckedChange={() => setStatusFilter(status)}
                    className="text-xs cursor-pointer capitalize"
                  >
                    {status.toLowerCase()}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table Block */}
        <div className="overflow-x-auto border-t border-border/40">
          <Table>
            <TableHeader className="bg-transparent">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-border/40 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-[10px] font-extrabold text-muted-foreground uppercase py-4 select-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-primary/5 border-b border-border/40 transition-colors duration-200"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 text-xs font-semibold">
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
                    className="h-24 text-center text-xs text-muted-foreground font-semibold"
                  >
                    No matching users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer controls matching mock footer perfectly */}
        <div className="flex items-center justify-between pt-2 text-[10px] text-muted-foreground font-bold tracking-wider select-none">
          <div className="flex items-center gap-3">
            
            {/* Page Size Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold rounded-xl gap-2 border-border/80 bg-background/50 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors">
                  {pageSize} ROWS <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-24 rounded-xl">
                {[5, 10, 20].map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => setPageSize(size)}
                    className="text-xs font-semibold cursor-pointer"
                  >
                    {size} Rows
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="font-mono text-muted-foreground">
              {table.getFilteredRowModel().rows.length} TOTAL USERS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-muted-foreground">
              PAGE {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 rounded-xl border-border/80 bg-background/50 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 rounded-xl border-border/80 bg-background/50 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
