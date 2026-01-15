"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFileText,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconLogout,
  IconCreditCard,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconFileText,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar() {

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <nav className="flex flex-col min-h-svh h-full p-6 gap-4 bg-gradient-to-b from-slate-900 via-purple-900/80 to-slate-900 border-r border-purple-400/30 sticky top-0">
      <ul className="flex flex-col gap-2 flex-1">
        <li>
          <a href="/dashboard" className="flex items-center gap-2 text-purple-200 hover:text-white hover:bg-purple-700/30 rounded-md px-3 py-2 transition-all duration-200">
            <IconFileText className="w-5 h-5" />
            <span>Documents</span>
          </a>
        </li>
        <li>
          <a href="/abonnement" className="flex items-center gap-2 text-purple-200 hover:text-white hover:bg-purple-700/30 rounded-md px-3 py-2 transition-all duration-200">
            <IconCreditCard className="w-5 h-5" />
            <span>Abonnement</span>
          </a>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-400 hover:text-white hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 rounded-md px-3 py-2 transition-all duration-200 cursor-pointer"
      >
        <IconLogout className="w-5 h-5" />
        <span>Se déconnecter</span>
      </button>
    </nav>
  );
}
