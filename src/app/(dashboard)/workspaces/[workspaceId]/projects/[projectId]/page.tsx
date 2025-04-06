import React from 'react';
import {checkAuthenticatedRoute} from "@/features/auth/queries";
import {getProject} from "@/features/projects/queries";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import {Button} from "@/components/ui/button";
import {PencilIcon} from "lucide-react";
import Link from "next/link";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";

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
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar name={initialValues.name} image={initialValues.imageUrl} className="size-8" />
                    <p className="text-lg font-semibold">
                        {initialValues.name}
                    </p>
                </div>
                <div>
                    <Button
                        variant="secondary"
                        size="sm"
                        asChild>
                        <Link href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}>
                            <PencilIcon className="size-4 mr-2"/>
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            <TaskViewSwitcher/>
        </div>
    );
};

export default Page;