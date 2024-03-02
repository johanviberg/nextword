"use client";

import { Archive, FileText, Layers, LucideIcon, Plug, Settings, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";

export interface NavLink {
  title: string;
  label?: string;
  icon: LucideIcon | React.ElementType;
  variant: "default" | "ghost";
  href: string;
}

const navLinks: NavLink[] = [
  {
    title: "Single Article",
    label: "128",
    icon: FileText,
    variant: "default",
    href: "/generate/single",
  },
  {
    title: "Batch Articles",
    label: "9",
    icon: Layers,
    variant: "ghost",
    href: "/generate/batch",
  },
  {
    title: "Custom Formats",
    label: "",
    icon: Settings2,
    variant: "ghost",
    href: "/formats",
  },
  {
    title: "Integrations",
    label: "23",
    icon: Plug,
    variant: "ghost",
    href: "/integrations",
  },
  {
    title: "Article Settings",
    label: "",
    icon: Settings,
    variant: "ghost",
    href: "/settings",
  },
  {
    title: "My Articles",
    label: "",
    icon: Archive,
    variant: "ghost",
    href: "/articles",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="group flex flex-col gap-4 py-2 h-[calc(100vh)] w-full max-w-[16rem] shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Link href="/">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">nextword</h5>
        </Link>
      </div>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === link.href ? "bg-muted hover:bg-muted" : "hover:bg-muted",
              "justify-start",
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            <span className="font-semibold">{link.title}</span>
            {link.label && <span className={cn("ml-auto", link.variant === "default" && "text-background")}>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
