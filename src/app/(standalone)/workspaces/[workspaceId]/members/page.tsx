import React from 'react';
import {checkAuthenticatedRoute} from "@/features/auth/queries";
import MembersList from "@/features/workspaces/components/members-list";

const Page = async () => {
    await checkAuthenticatedRoute(true, "/sign-in");

    return (
        <div className="w-full lg:max-w-xl">
            <MembersList/>
        </div>
    );
};

export default Page;