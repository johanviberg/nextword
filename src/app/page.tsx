"use client";

import * as React from "react";

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
    <div>
      <Logo className="w-16" />
      <h1 className="mt-4">nextword</h1>
      <p className="mt-2 text-sm text-gray-800">
        Here is a shadcn button. <Button>Hello</Button>
      </p>
    </div>
  );
}
