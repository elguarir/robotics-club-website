import { HomeIcon, ListTodo, File, MessageCircleIcon } from "lucide-react";

export const links = [
  { icon: HomeIcon, href: "/dashboard", label: "Dashboard" },
  { icon: MessageCircleIcon, href: "/chat", label: "Chat", badge: 6 },
  { icon: File, href: "/projects", label: "Projects" },
  { icon: ListTodo, href: "/tasks", label: "Tasks" },
];
