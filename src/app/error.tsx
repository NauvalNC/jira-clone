"use client";

import React from 'react';
import {AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
    return (
        <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
            <AlertTriangle className="size-6"/>
            <p className="text-sm">
                Something went wrong. Please try again later.
            </p>
            <Button
                variant="secondary"
                size="sm"
                asChild>
                <Link href="/">
                    Back to home
                </Link>
            </Button>
        </div>
    );
};

export default Error;