"use client";

import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Loader, PlusIcon} from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import useCreateTaskModal from "@/features/tasks/hooks/use-create-task-modal";
import {useGetTasks} from "@/features/tasks/api/use-get-tasks";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useQueryState} from "nuqs";
import DataFilters from "@/features/tasks/components/data-filters";
import useTasksFilters from "@/features/tasks/hooks/use-tasks-filters";
import {DataTable} from "@/features/tasks/components/data-table";
import {columns} from "@/features/tasks/components/columns";

const TaskViewSwitcher = () => {
    const workspaceId = useWorkspaceId();
    const [filters] = useTasksFilters();

    const {data: tasks, isLoading: isLoadingTasks} = useGetTasks({
        workspaceId,
        ...filters
    });

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table"
    });

    const {open} = useCreateTaskModal();
    return (
        <Tabs className="flex-1 w-full border rounded-lg" defaultValue={view} onValueChange={setView}>
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            Table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size="sm"
                        className="w-full lg:w-auto">
                        <PlusIcon className="size-4"/>
                        New Task
                    </Button>
                </div>
                <DottedSeparator className="my-4"/>
                <DataFilters/>
                <DottedSeparator className="my-4"/>
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground"/>
                    </div>
                ) : (
                <>
                    <TabsContent value="table" className="mt-0">
                        <DataTable columns={columns} data={tasks?.documents ?? []}/>
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        {JSON.stringify(tasks)}
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0">
                        {JSON.stringify(tasks)}
                    </TabsContent>
                </>
                )}
            </div>
        </Tabs>
    );
};

export default TaskViewSwitcher;