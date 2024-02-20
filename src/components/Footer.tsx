import * as React from "react";
import { FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a href="https://twitter.com/nextwordai">
            <FaTwitter className="h-6 w-6" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Nextword</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>All Rights Reserved</div>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
