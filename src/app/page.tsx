"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <h1 className="mt-4">nextword</h1>
      <p className="mt-2 text-sm text-gray-800">
        Here is a shadcn button. <Button>Hello</Button>
      </p>
    </div>
  );
}
