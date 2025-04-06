import React from 'react';
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {MemberOption, ProjectOption, TaskStatus} from "@/features/tasks/types";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FolderIcon, ListChecksIcon, UserIcon} from "lucide-react";
import useTasksFilters from "@/features/tasks/hooks/use-tasks-filters";
import DatePicker from "@/components/date-picker";

interface DataFiltersProps {
    hideProjectFilter?: boolean;
}

const DataFilters = ({}: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();
    const {data: projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId});
    const {data: members, isLoading: isLoadingMembers} = useGetMembers({workspaceId});
    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl
    })) as ProjectOption[];

    const memberOptions = members?.documents.map((member) => ({
        id: member.$id,
        name: member.name
    })) as MemberOption[];

    const [{
        status,
        assigneeId,
        projectId,
        dueDate
    }, setFilters] = useTasksFilters();

    const onStatusChange = (value: string) => {
        setFilters({status: (value === "all") ? null : value as TaskStatus});
    }
    const onAssigneeChange = (value: string) => {
        setFilters({assigneeId: (value === "all") ? null : value as string});
    }
    const onProjectChange = (value: string) => {
        setFilters({projectId: (value === "all") ? null : value as string});
    }

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select defaultValue={status ?? undefined} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="All Statuses"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {Object.values(TaskStatus).map((status) => (
                        <SelectItem key={status.toString()} value={status}>
                            {status.toString()}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select defaultValue={assigneeId ?? undefined} onValueChange={onAssigneeChange}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="All Assignees"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    {memberOptions.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-x-2">
                                {member.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select defaultValue={projectId ?? undefined} onValueChange={onProjectChange}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <FolderIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="All Projects"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projectOptions.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                                {project.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DatePicker
                placeholder="Due Date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChangeAction={(date) => {
                    setFilters({dueDate: date ? date.toISOString() : null});
                }}/>
        </div>
    );
};

export default DataFilters;