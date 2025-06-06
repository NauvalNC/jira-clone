"use client";

import React, {useRef} from 'react';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {updateWorkspaceSchema} from "@/features/workspaces/schemas";
import {useForm} from "react-hook-form";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {ArrowLeftIcon, ImageIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {useConfirm} from "@/hooks/use-confirm";
import {useUpdateProject} from "@/features/projects/api/use-update-project";
import {updateProjectSchema} from "@/features/projects/schemas";
import {Project} from "@/features/projects/types";
import {useDeleteProject} from "@/features/projects/api/use-delete-project";

interface EditProjectFormProps {
    onCancel?: () => void;
    initialValue: Project;
}

const EditProjectForm = ({onCancel, initialValue}: EditProjectFormProps) => {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const {mutate: updateProject, isPending: isUpdateProject} = useUpdateProject();
    const {mutate: deleteProject, isPending: isDeleteProject} = useDeleteProject();
    const isPending = isUpdateProject || isDeleteProject;

    // Handle edit project
    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValue,
            image: initialValue.imageUrl ?? ""
        }
    });
    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        }
        updateProject(
            {form: finalValues, param: {projectId: initialValue.$id}},
            {
                onSuccess: () => {
                    form.reset();
                }
            });
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    };
    const handleRemoveImage = () => {
        form.setValue("image", "");
    };

    // Handle delete project
    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Project",
        "This action cannot be undone",
        "destructive");
    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) {
            return;
        }
        deleteProject(
            {param: {projectId: initialValue.$id}},
            {
                onSuccess: () => {
                    form.reset();
                    window.location.href = `/workspaces/${initialValue.workspaceId}`;
                }
            });
    };

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog/>
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row justify-between items-center gap-x-4 p-7 space-y-0">
                    <CardTitle className="text-xl font-bold">
                        Edit Project
                    </CardTitle>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={onCancel ? onCancel : () =>
                            router.push(`/workspaces/${initialValue.workspaceId}/projects/${initialValue.$id}`)}>
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                    </Button>
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
                                                Project Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter project name"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name={"image"}
                                    render={({field}) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image
                                                            src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                                                            alt="logo"
                                                            fill className="object-cover"/>
                                                    </div>
                                                ): (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-400"/>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">Project Icon</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        JPG, PNG, SVG, or JPEG, max 1 MB
                                                    </p>
                                                    <input
                                                        className="hidden"
                                                        accept=".jpg, .png, .jpeg, .svg"
                                                        type="file"
                                                        ref={inputRef}
                                                        disabled={isPending}
                                                        onChange={handleImageChange}/>
                                                    {field.value ? (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="destructive"
                                                            size="xs"
                                                            className="w-fit mt-2"
                                                            onClick={handleRemoveImage}>
                                                            Remove Image
                                                        </Button>
                                                    ): (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="tertiary"
                                                            size="xs"
                                                            className="w-fit mt-2"
                                                            onClick={() => inputRef.current?.click()}>
                                                            Upload Image
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground">Deleting a project is irreversible and will remove all associated data</p>
                        <DottedSeparator className="py-7"/>
                        <Button
                            className="w-fit ml-auto"
                            size="sm"
                            variant="destructive"
                            type="button"
                            disabled={isPending} onClick={handleDelete}>
                            Delete Project
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProjectForm;