"use client";

import React from 'react';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {createTaskSchema} from "@/features/tasks/schemas";
import {useCreateTask} from "@/features/tasks/api/use-create-task";
import {MemberOption, ProjectOption, TaskStatus} from "@/features/tasks/types";
import DatePicker from "@/components/date-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import MemberAvatar from "@/features/members/components/member-avatar";
import ProjectAvatar from "@/features/projects/components/project-avatar";

interface CreateTaskFormProps {
    onCancel?: () => void;
    projectOptions: ProjectOption[];
    memberOptions: MemberOption[];
}

const CreateTaskForm = ({onCancel, projectOptions, memberOptions}: CreateTaskFormProps) => {
    const workspaceId = useWorkspaceId();
    const {mutate, isPending} = useCreateTask();

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            workspaceId
        }
    });

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        mutate(
            {json: {...values, workspaceId}},
            {
                onSuccess: () => {
                    form.reset();
                    onCancel?.();
                }
            });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new task
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name={"name"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Task Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter task name"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name={"dueDate"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Due Date
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} onChangeAction={field.onChange}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name={"assigneeId"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Assignee
                                        </FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Assignee"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                {memberOptions.map((member) => (
                                                    <SelectItem key={member.id} value={member.id}>
                                                        <div className="flex items-center gap-x-2">
                                                            <MemberAvatar name={member.name} className="size-6"/>
                                                            {member.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name={"status"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Status
                                        </FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                {Object.values(TaskStatus).map((status) => (
                                                    <SelectItem key={status.toString()} value={status}>
                                                        {status.toString()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name={"projectId"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project
                                        </FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Project"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage/>
                                            <SelectContent>
                                                {projectOptions.map((project) => (
                                                    <SelectItem key={project.id} value={project.id}>
                                                        <div className="flex items-center gap-x-2">
                                                            <ProjectAvatar name={project.name} image={project.imageUrl} className="size-6"/>
                                                            {project.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>
                        </div>
                        <DottedSeparator className="py-7"/>
                        <div className="flex items-center justify-between">
                            <Button
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}>
                                Cancel
                            </Button>
                            <Button type="submit" size="lg" disabled={isPending}>
                                Create Task
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreateTaskForm;