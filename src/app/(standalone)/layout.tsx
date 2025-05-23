import React from 'react';
import Link from "next/link";
import Image from "next/image";
import UserButton from "@/features/auth/components/user-button";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex items-center justify-between h-[73px]">
                    <Link href="/">
                        <Image src="/logo.svg" alt="logo" width={152} height={30} priority={true} />
                    </Link>
                    <UserButton/>
                </nav>
                <div className="flex flex-col items-center justify-center py-4">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;