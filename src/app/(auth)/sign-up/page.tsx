import React from 'react';
import SignUpCard from "@/features/auth/components/sign-up-card";
import {checkAuthenticatedRoute} from "@/features/auth/queries";

const Page = async () => {
    await checkAuthenticatedRoute(false, "/");

    return (
        <SignUpCard/>
    );
};

export default Page;