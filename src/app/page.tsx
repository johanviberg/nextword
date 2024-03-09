"use client";

import * as React from "react";

export default function HomePage() {
  return (
    <div>
      <h1 className="mt-4 text-xl">Get Started</h1>
      <p className="mt-2 text-sm text-gray-800">
        If onboarding is not complete, show onboarding component, and if yes, show the dashboard.
      </p>
      <h1 className="mt-4 text-xl">Onboarding (Hide)</h1>
      <ul className="mt-5">
        <li>Invite your team (assuming first, admin user) [CTA button]</li>
        <li>Create an article [CTA button]</li>
        <li>Connect a CMS [CTA button]</li>
        <li>Publish an article to a CMS [CTA button]</li>
      </ul>
      <h1 className="mt-4 text-xl">Dashboard</h1>
      <p>Show empty state like Vercel Analytics</p>
      <p>Date Range: Last 24 Hours, Last 7 Days, Last 30 Days, Last 3 Months, Last 12 Months </p>
      <ul className="mt-5">
        <li>Articles created (single value)</li>
        <li>Articles published (single value)</li>
        <li>Articles created over time (graph)</li>
        <li>Articles published over time (graph)</li>
        <li>Average word count per article</li>
        <li>Credits Remaining</li>
        <li>Credits Used</li>
      </ul>
    </div>
  );
}
