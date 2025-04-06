"use client";

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useJoinWorkspace} from "@/features/workspaces/api/use-join-workspace";
import {useInviteCode} from "@/features/workspaces/hooks/use-invite-code";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";
import {useRouter} from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValue: { name: string };
}

const JoinWorkspaceForm = ({initialValue}: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const inviteCode = useInviteCode();
    const workspaceId = useWorkspaceId();
    const {mutate, isPending} = useJoinWorkspace();

    const handleJoin = async () => {
      mutate({
          param: {workspaceId},
          json: {code:inviteCode}
      },{
          onSuccess: ({data}) => {
              router.push(`/workspaces/${data.$id}`);
          }
      })
    };
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{initialValue.name}</strong> workspace
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row items-center gap-2 justify-between">
                    <Button
                        className="w-full lg:w-fit"
                        type="button"
                        variant="secondary"
                        size="lg"
                        asChild
                        disabled={isPending}>
                        <Link href="/">
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        className="w-full lg:w-fit"
                        type="button"
                        size="lg"
                        onClick={handleJoin}
                        disabled={isPending}>
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default JoinWorkspaceForm;