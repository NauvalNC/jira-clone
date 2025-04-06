"use client";

import React from 'react';
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go";
import {SettingsIcon, UsersIcon} from "lucide-react";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id"
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

const routes = [
    {
       label: "Home",
       href: "",
       icon: GoHome,
       activeIcon:  GoHomeFill
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon:  GoCheckCircleFill
    },
    {
        label: "Members",
        href: "/members",
        icon: UsersIcon,
        activeIcon:  UsersIcon
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon:  SettingsIcon
    }
];

const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathName = usePathname();

    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`;
                const isActive = pathName === fullHref;
                const Icon = isActive ? item.activeIcon : item.icon;
                return (
                    <Link key={item.href} href={fullHref}>
                        <div className={cn("flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary text-neutral-500", isActive && "bg-white shadow-sm hover:opacity-100 text-primary")}>
                            <Icon className="size-5 text-neutral-500"/>
                            {item.label}
                        </div>
                    </Link>
                );
            })}
        </ul>
    );
};

export default Navigation;