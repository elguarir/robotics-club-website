// "use client";
// import { Button } from "@/components/ui/button";
// import { createUser } from "@/lib/helpers/user";
// import { useMutation } from "@tanstack/react-query";
// import { Plus } from "lucide-react";

// const AddNewMember = () => {
//   const { mutate: create } = useMutation({
//     mutationFn: createUser,
//   });

//   return (
// <Button size={"sm"}>
//   <Plus className="mr-2 w-3.5 h-3.5" />
//   Add Member
// </Button>
//   );
// };

// export default AddNewMember;

"use client";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/lib/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddNewMemberModal() {
  const [open, setOpen] = useState(false);
  const { isDesktop, isTablet } = useMediaQuery();
  if (isDesktop || isTablet) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="focus-visible:outline-primary">
          <Button size={"sm"}>
            <Plus className="mr-2 w-3.5 h-3.5" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Add a new member to the club by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <CreateForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="focus-visible:outline-primary" asChild>
        <Button size={"sm"}>
          <Plus className="mr-2 w-3.5 h-3.5" />
          Add Member
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add New Member</DrawerTitle>
          <DrawerDescription>
            Add a new member to the club by filling out the form below.
          </DrawerDescription>
        </DrawerHeader>
        <CreateForm className="px-4 pb-4 pt-6" />
      </DrawerContent>
    </Drawer>
  );
}

interface CreateFormProps {
  className?: string;
}

function CreateForm({ className }: CreateFormProps) {
  const formSchema = z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(4, "Name is too short"),
    username: z
      .string({ required_error: "Username is required" })
      .min(4, "Username is too short"),
    email: z
      .string({ required_error: "Email is required" })
      .email("This email is invalid"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
