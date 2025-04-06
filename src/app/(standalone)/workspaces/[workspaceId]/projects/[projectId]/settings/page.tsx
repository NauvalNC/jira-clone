import React from 'react';
import {checkAuthenticatedRoute} from "@/features/auth/queries";
import {getProject} from "@/features/projects/queries";
import EditProjectForm from "@/features/projects/components/edit-project-form";

interface PageProps {
    params: {
        projectId: string;
    }
}

const Page = async ({params}: PageProps) => {
    await checkAuthenticatedRoute(true, "/sign-in");
    const {projectId} = await params;
    const initialValues = await getProject({projectId});
    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialValue={initialValues}/>
        </div>
    );
};

export default Page;