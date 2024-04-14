import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { PropsWithChildren } from "react";
import QueryClient from "@/lib/providers/QueryClient";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "ESTE Robotics Club - Home",
  description:
    "ESTE Robotics Club is a student-led club that aims to promote robotics and STEM education in the community.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.variable}`}>
      <body>
        <QueryClient>{children}</QueryClient>
        <Toaster closeButton />
      </body>
    </html>
  );
}
