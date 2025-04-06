import React from 'react';
import SignInCard from "@/features/auth/components/sign-in-card";
import {checkAuthenticatedRoute} from "@/features/auth/queries";

const Page = async () => {
    await checkAuthenticatedRoute(false, "/");

    return (
        <SignInCard/>
    );
};

export default Page;