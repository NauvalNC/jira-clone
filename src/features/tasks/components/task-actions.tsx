import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, FolderIcon, PencilIcon, TrashIcon} from "lucide-react";

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

const TaskActions = ({children}: TaskActionsProps) => {
    return (
        <div className="flex justify-end">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => {}} disabled={false} className="font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-2"/>
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}} disabled={false} className="font-medium p-[10px]">
                        <FolderIcon className="size-4 mr-2 stroke-2"/>
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}} disabled={false} className="font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-2"/>
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}} disabled={false} className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-2"/>
                        Delete Icon
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TaskActions;