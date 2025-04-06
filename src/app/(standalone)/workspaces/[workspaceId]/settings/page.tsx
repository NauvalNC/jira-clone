import React from 'react';
import {checkAuthenticatedRoute} from "@/features/auth/queries";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import {getWorkspace} from "@/features/workspaces/queries";

interface PageProps {
    params: {
        workspaceId: string;
    }
}

const Page = async ({params}: PageProps) => {
    await checkAuthenticatedRoute(true, "/sign-in");
    const {workspaceId} = await params;
    const initialValues = await getWorkspace({workspaceId});
    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValue={initialValues}/>
        </div>
    );
};

export default Page;