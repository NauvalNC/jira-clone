import React from 'react';
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {Card, CardContent} from "@/components/ui/card";
import {Loader} from "lucide-react";
import {MemberOption, ProjectOption} from "@/features/tasks/types";
import {useGetTask} from "@/features/tasks/api/use-get-task";
import EditTaskForm from "@/features/tasks/components/edit-task-form";

interface EditTaskFormWrapperProps {
    onCancel: () => void;
    id: string;
}

const EditTaskFormWrapper = ({id, onCancel}: EditTaskFormWrapperProps) => {
    const workspaceId = useWorkspaceId();

    const {data: initialValues, isLoading: isLoadingTask} = useGetTask({taskId: id});
    const {data: projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId});
    const {data: members, isLoading: isLoadingMembers} = useGetMembers({workspaceId});

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
    })) as ProjectOption[];

    const memberOptions = members?.documents.map((member) => ({
        id: member.$id,
        name: member.name
    })) as MemberOption[];

    const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground"/>
                </CardContent>
            </Card>
        );
    }

    if (!initialValues) {
        return null;
    }

    return (
        <EditTaskForm onCancel={onCancel} projectOptions={projectOptions} memberOptions={memberOptions} initialValues={initialValues}/>
    );
};

export default EditTaskFormWrapper;