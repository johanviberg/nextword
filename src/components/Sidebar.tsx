import Link from "next/link";
import * as React from "react";
import { MdArticle, MdBatchPrediction, MdBuild, MdLibraryBooks, MdPayment, MdSettings, MdSettingsInputComponent } from "react-icons/md";

export const Sidebar = () => {
  // TODO: Add links/routes and handle active states with next/navigation
  // TODO: Add separators in the sidebar items

  return (
    <>
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Link href="/">
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">nextword</h5>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdArticle className="h-5 w-5" />
            </div>
            <Link href="/generate/single">Single Articles</Link>
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdBatchPrediction className="h-5 w-5" />
            </div>
            <Link href="/generate/batch">Batch Generator</Link>
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdBuild className="h-5 w-5" />
            </div>
            Custom Formats
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdSettingsInputComponent className="h-5 w-5" />
            </div>
            Integrations
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdSettings className="h-5 w-5" />
            </div>
            Article Settings
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdLibraryBooks className="h-5 w-5" />
            </div>
            <Link href="/articles">My Articles</Link>{" "}
            <div className="grid place-items-center ml-auto justify-self-end">
              <div
                className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full"
                style={{ opacity: 1 }}
              >
                <span className="">14</span>
              </div>
            </div>
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <MdPayment className="h-5 w-5" />
            </div>
            Billing
          </div>
        </nav>
      </div>
    </>
  );
};
