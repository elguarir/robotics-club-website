import {
  HomeIcon,
  ListTodo,
  File,
  MessageCircleIcon,
  Settings,
  User,
} from "lucide-react";

export const links = [
  { icon: HomeIcon, href: "/dashboard", label: "Dashboard" },
  { icon: MessageCircleIcon, href: "/dashboard/chat", label: "Chat", badge: 6 },
  { icon: File, href: "/dashboard/projects", label: "Projects" },
  { icon: ListTodo, href: "/dashboard/tasks", label: "Tasks" },
  { icon: User, href: "/dashboard/members", label: "Members" },
  { icon: Settings, href: "/dashboard/settings", label: "Settings" },
];
