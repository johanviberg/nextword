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
  href: string;
}

const navLinks: NavLink[] = [
  {
    title: "Single Article",
    label: "128",
    icon: FileText,
    href: "/generate/single",
  },
  {
    title: "Batch Articles",
    label: "9",
    icon: Layers,
    href: "/generate/batch",
  },
  {
    title: "Custom Formats",
    label: "",
    icon: Settings2,
    href: "/formats",
  },
  {
    title: "Integrations",
    label: "23",
    icon: Plug,
    href: "/integrations",
  },
  {
    title: "Article Settings",
    label: "",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "My Articles",
    label: "",
    icon: Archive,
    href: "/articles",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="shadow-blue-gray-900/5 group flex h-[calc(100vh)] w-full max-w-[16rem] flex-col gap-4 py-2 shadow-xl">
      <div className="mb-2 p-4">
        <Link href="/">
          <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased">nextword</h5>
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
            <span className="text-gray-800">{link.title}</span>
            {link.label && (
              <span className={cn("ml-auto", pathname === link.href ? "text-background text-gray-800" : "")}>{link.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
