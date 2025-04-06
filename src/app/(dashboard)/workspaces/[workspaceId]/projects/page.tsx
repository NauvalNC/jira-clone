import React from 'react';
import {checkAuthenticatedRoute} from "@/features/auth/queries";

const Page = async () => {
    await checkAuthenticatedRoute(true, "/sign-in");

    return (
        <div></div>
    );
};

export default Page;