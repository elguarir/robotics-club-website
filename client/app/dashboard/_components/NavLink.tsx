"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const NavLink = (props: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={props.href}
      className={cn(
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
        props.href === pathname && "bg-neutral-200/40 text-foreground",
        props.className
      )}
    >
      {props.children}
    </Link>
  );
};

export default NavLink;
