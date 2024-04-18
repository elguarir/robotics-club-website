"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { roles } from "./data";
import { User } from "./schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<User>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} className="max-md:ml-4" title="User" />
    ),
    cell: ({ row }) => {
      let user = row.getValue("user") as User["user"];
      return (
        <div className="flex items-center space-x-3 w-fit max-lg:min-w-64 max-md:ml-4">
          <Avatar>
            <AvatarImage src={user.profilePic} alt={user.name} />
            <AvatarFallback>
              {user.name.charAt(0) + user.name.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{user.name}</span>
            <span className="text-muted-foreground">{user.username}</span>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      let user = row.getValue("user") as User["user"];
      let email = row.getValue("email") as User["email"];
      return (
        user.name.toLowerCase().includes(value) ||
        user.username.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value)
      );
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      let email = row.getValue("email") as User["email"];
      return (
        <div className="flex items-center">
          <span className="font-medium">{email}</span>
        </div>
      );
    },

  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      let userRoles = row.getValue("roles") as User["roles"];
      return (
        <div className="flex items-center space-x-2">
          {userRoles.slice(0, 2).map((role) => {
            let label = roles.find((r) => r.value === role)?.label;
            return (
              <Badge key={role} variant={"outline"}>
                {label}
              </Badge>
            );
          })}
          {roles.length > 2 && (
            <Badge variant={"outline"}>+{roles.length - 2}</Badge>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      let userRoles = row.getValue("roles") as User["roles"];
      return userRoles.includes(value);
    },
    enableSorting: false,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

// export const userSchema = z.object({
//   user: z.object({
//     _id: z.string(),
//     name: z.string(),
//     username: z.string(),
//     profilePic: z.string(),
//   }),
//   email: z.string(),
//   roles: z.array(z.string()),
//   createdAt: z.string(),
// });
