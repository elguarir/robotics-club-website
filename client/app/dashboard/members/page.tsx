"use client";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import AddNewMemberModal from "./_components/AddNewMember";
import { getUsers } from "@/lib/helpers/user";
import { User } from "@/lib/hooks/types";

export default function Members() {
  let { data, isLoading } = useQuery({
    queryKey: ["getMembers"],
    queryFn: getUsers,
    refetchOnWindowFocus: true,
  });

  const formattedUsers = formatUsers({
    users: data?.success ? data.data : [],
  } as formattedUsersProps);
  return (
    <>
      <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center px-4 justify-between w-full">
          <h1 className="text-lg font-semibold md:text-2xl">Members</h1>
          <div className="flex items-center gap-2">
            <Button size={"sm"} variant={"outline"}>
              <Upload className="mr-2 w-3.5 h-3.5" />
              Import
            </Button>
            <AddNewMemberModal />
          </div>
        </div>
        <div>
          {isLoading ? (
            <>
              <div className="flex flex-col items-center justify-center w-full h-48 gap-3">
                <BarLoader color="#3d3d3d" />
                <p className="text-sm font-[450]">Loading users...</p>
              </div>
            </>
          ) : (
            <DataTable data={formattedUsers} columns={columns} />
          )}
        </div>
      </main>
    </>
  );
}

interface formattedUsersProps {
  users: User[];
}

function formatUsers({ users }: formattedUsersProps) {
  return users.map((user) => ({
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePic: user.profilePic,
    },
    email: user.email,
    roles: user.roles,
    createdAt: user.createdAt,
  }));
}
