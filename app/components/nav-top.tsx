"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import {
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightEndOnRectangleIcon
} from "@heroicons/react/24/outline";
import SecondaryNavTop from "@/app/components/secondary-nav-top";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

interface NavTopProps {
  selectedTeam: string;
  onTeamChange: (team: string) => void;
  selectedSprint: string;
  onSprintChange: (sprint: string) => void;
}

export function NavTop({ selectedTeam, onTeamChange, selectedSprint, onSprintChange }: NavTopProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Top Row */}
      <div className="h-[52px] flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-800">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
          <Image
            src="/retrospecter.svg"
            alt="Retrospecter Logo"
            width={140}
            height={40}
            className="dark:invert"
            />
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Profile"
          >
            {session?.user?.image ? (
              <Avatar className="w-6 h-6">
                <AvatarImage src={session.user.image} alt={session.user.name || "User avatar"} />
                <AvatarFallback>
                  <UserCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <UserCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Settings"
              >
                <Cog6ToothIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="right">
              <DropdownMenuItem onClick={() => router.push('/teams')}>
                Teams
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
      <div className="flex items-center justify-between px-4 bg-gray-50 dark:bg-gray-800">
        <SecondaryNavTop 
          selectedTeam={selectedTeam} 
          onTeamChange={onTeamChange} 
          selectedSprint={selectedSprint} 
          onSprintChange={onSprintChange} 
        />
      </div>
    </div>
  );
}
