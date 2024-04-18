"use client";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { Bell, Menu, Package2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavLink from "./_components/NavLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthenticatedOnly from "@/components/AuthenticatedOnly";
import LogOutButton from "./_components/LogOutButton";
import { links } from "@/lib/constants";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const DashboardLayout = (props: PropsWithChildren) => {
  return (
    <AuthenticatedOnly>
      {(user) => (
        <div className="grid overflow-hidden fixed w-full md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex flex-col h-full max-h-screen gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Package2 className="w-6 h-6" />
                  <span className="">Robotics Club</span>
                </Link>
                {/* <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 ml-auto"
                >
                  <Bell className="w-4 h-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button> */}
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium md:px-4 lg:px-6">
                  {links.map((link) => (
                    <NavLink href={link.href}>
                      {link.icon && <link.icon className="w-4 h-4" />}
                      <span>{link.label}</span>
                      {link.badge && (
                        <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                          {link.badge}
                        </Badge>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="p-4 mt-auto">
                <Card>
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle className="flex flex-row items-center">
                      <img
                        src={user?.profilePic}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col gap-0 ml-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          Logged in as:
                        </span>
                        <span className="font-semibold">{user?.name}</span>
                      </div>
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                    <LogOutButton />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="flex flex-col w-full max-w-sm px-0"
                >
                  <ScrollArea className="h-screen">
                    <div className="flex flex-col justify-between max-h-full h-[calc(100dvh-60px)] px-6 sm:px-8 ">
                      <nav className="grid gap-2 text-lg font-medium">
                        <Link
                          href="#"
                          className="flex items-center gap-2 text-lg font-semibold"
                        >
                          <Package2 className="w-6 h-6" />
                          <span className="sr-only">Robotics Club</span>
                        </Link>
                        <div className="pt-6">
                          {links.map((link) => (
                            <NavLink href={link.href}>
                              {link.icon && <link.icon className="w-5 h-5" />}
                              <span>{link.label}</span>
                              {link.badge && (
                                <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                                  {link.badge}
                                </Badge>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      </nav>
                      <div className="mt-auto">
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="flex flex-row items-center">
                              <img
                                src={user?.profilePic}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex flex-col gap-0 ml-2">
                                <span className="text-xs font-medium text-muted-foreground">
                                  Logged in as:
                                </span>
                                <span className="font-semibold">
                                  {user?.name}
                                </span>
                              </div>
                            </CardTitle>
                            <CardDescription></CardDescription>
                          </CardHeader>
                          <CardContent className="p-2 pt-0">
                            <LogOutButton />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              <div className="flex-1 w-full"></div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="overflow-hidden rounded-full shadow-sm border-muted"
                  >
                    <img
                      className="rounded-full"
                      src={user?.profilePic}
                      alt=""
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <div>
              <MaxWidthWrapper>{props.children}</MaxWidthWrapper>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedOnly>
  );
};

export default DashboardLayout;
