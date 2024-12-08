"use client"

import { ReactNode, useState } from "react";
import { NavTop } from "./nav-top";

export default function Skeleton({ children }: { children: ReactNode }) {


    return (
        <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
            <NavTop />
            {children}
        </div>
    )
}