import React from 'react';
import {checkAuthenticatedRoute} from "@/features/auth/queries";
import {getWorkspaceInfo} from "@/features/workspaces/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import {redirect} from "next/navigation";

interface PageProps {
    params: {
        workspaceId: string;
    }
}

const Page = async ({params}: PageProps) => {
    await checkAuthenticatedRoute(true, "/sign-in");

    const workspaceInfo = await getWorkspaceInfo({workspaceId: params.workspaceId});
    if (!workspaceInfo) {
        redirect("/");
    }

    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm initialValue={workspaceInfo}/>
        </div>
    );
};

export default Page;