import React from 'react';
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import {checkAuthenticatedRoute} from "@/features/auth/queries";

const Page = async () => {
    await checkAuthenticatedRoute(true, "/sign-in");

    return (
        <div className="w-full lg:max-w-screen-xl">
            <CreateWorkspaceForm/>
        </div>
    );
};

export default Page;