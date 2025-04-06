"use client"

import React, {Fragment} from 'react';
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowLeftIcon, MoreVerticalIcon} from "lucide-react";
import Link from "next/link";
import DottedSeparator from "@/components/dotted-separator";
import {useGetMembers} from "@/features/members/api/use-get-members";
import MemberAvatar from "@/features/members/components/member-avatar";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useDeleteMember} from "@/features/members/api/use-delete-member";
import {useUpdateMember} from "@/features/members/api/use-update-member";
import {MemberRole} from "@/features/members/types";
import {useConfirm} from "@/hooks/use-confirm";

const MembersList = () => {
    const workspaceId = useWorkspaceId();
    const [RemoveMemberDialog, confirmRemoveMember] = useConfirm(
        "Remove member",
        "This member will be removed from the workspace",
        "destructive"
    );

    const {data: members} = useGetMembers({workspaceId});
    const {mutate: updateMember, isPending: isUpdateMember} = useUpdateMember();
    const {mutate: deleteMember, isPending: isDeleteMember} = useDeleteMember();
    const isPending = isUpdateMember || isDeleteMember;

    const handleUpdateMember = async (memberId: string, role: MemberRole) => {
        updateMember({
            json: {role},
            param: {memberId}
        });
    };

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirmRemoveMember();
        if (!ok) {
            return;
        }

        deleteMember({
            param: {memberId}
        },
        {
            onSuccess: () => {
                window.location.reload();
            }
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <RemoveMemberDialog/>
            <CardHeader className="flex flex-row items-center justify-between gap-x-4 p-7 space-y-0">
                <CardTitle className="text-xl font-bold">
                    Members List
                </CardTitle>
                <Button
                    variant="secondary"
                    size="sm"
                    asChild>
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                    </Link>
                </Button>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                {members?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                className="size-10"
                                fallbackClassName="text-lg"
                                name={member.name}/>
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant="secondary"
                                        size="icon">
                                        <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                        disabled={isPending}>
                                        Set as Administrator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        disabled={isPending}>
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium text-amber-700"
                                        onClick={() => handleDeleteMember(member.$id)}
                                        disabled={isPending}>
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < members.total - 1 && (
                            <Separator className="my-2.5"/>
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    );
};

export default MembersList;