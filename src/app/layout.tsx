import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import * as React from "react";

import "@/styles/globals.css";

import { cn } from "@/lib/utils";

import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

import { siteConfig } from "@/constant/config";
import { ReactQueryClientProvider } from "@/providers/ReactQueryClientProvider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/api/og`],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/api/og`],
    creator: "@NextWordAI",
  },
  authors: [
    {
      name: "NextWordAI",
      url: "https://nextword.ai",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("flex h-full flex-col scroll-smooth bg-white antialiased", GeistSans.className)}>
        <ReactQueryClientProvider>
          <div className="flex">
            <Sidebar />
            <div className="flex flex-grow flex-col">
              {/* TODO: Set a minimum width for the main content area */}
              <main className="mt-10 flex-grow pl-24 pr-24">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </div>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
