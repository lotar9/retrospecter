"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import {
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";
import SecondaryNavTop from "@/app/components/secondary-nav-top";

export function NavTop() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Top Row */}
      <div className="h-[52px] flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-800">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/retrospecter.svg"
            alt="Retrospecter Logo"
            width={140}
            height={40}
            className="dark:invert"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Profile"
          >
            <UserCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === "dark" ? (
                <SunIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )
            )}
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Settings"
          >
            <Cog6ToothIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => signOut({ callbackUrl: '/' })}
            aria-label="Sign out"
          >
            <ArrowRightEndOnRectangleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700" />

      {/* Bottom Row */}
      <SecondaryNavTop />
    </div>
  );
}
