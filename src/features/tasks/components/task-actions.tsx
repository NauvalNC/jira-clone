import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, FolderIcon, PencilIcon, TrashIcon} from "lucide-react";
import {useDeleteTask} from "@/features/tasks/api/use-delete-task";
import {useConfirm} from "@/hooks/use-confirm";
import {useRouter} from "next/navigation";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import useEditTaskModal from "@/features/tasks/hooks/use-edit-task-modal";

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

const TaskActions = ({id, projectId, children}: TaskActionsProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const {open} = useEditTaskModal();

    const [DeleteTaskDialog, confirmDeleteTask] = useConfirm(
        "Delete task",
        "This action cannot be undone",
        "destructive"
    );
    const {mutate, isPending: isDeleteTask} = useDeleteTask();
    const isPending = isDeleteTask;

    const handleOnDeleteTask = async () => {
        const ok = await confirmDeleteTask();
        if (!ok) {
            return;
        }

        mutate({param: {taskId: id}});
    };

    const handOnOpenTask = async () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    }

    const handleOnOpenProject = async () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    }

    return (
        <div className="flex justify-end">
            <DeleteTaskDialog/>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handOnOpenTask} disabled={false} className="font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2"/>
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOnOpenProject} disabled={false} className="font-medium p-[10px]">
                        <FolderIcon className="size-4 mr-2 stroke-2"/>
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => open(id)} disabled={false} className="font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2"/>
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleOnDeleteTask} disabled={isPending} className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2"/>
                        Delete Icon
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TaskActions;