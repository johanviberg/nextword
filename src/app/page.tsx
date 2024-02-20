"use client";

import Head from "next/head";
import * as React from "react";

import UnderlineLink from "@/components/links/UnderlineLink";
import { Button } from "@/components/ui/button";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from "~/svg/Logo.svg";

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Nextword</title>
      </Head>
      <section className="bg-white">
        <div className="layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center">
          <Logo className="w-16" />
          <h1 className="mt-4">nextword</h1>
          <p className="mt-2 text-sm text-gray-800">
            Here is a shadcn button. <Button>Hello</Button>
          </p>

          <footer className="absolute bottom-2 text-gray-700">
            © {new Date().getFullYear()} By <UnderlineLink href="https://nextword.ai">NextWord</UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
