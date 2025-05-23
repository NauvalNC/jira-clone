import {Query} from "node-appwrite";
import {DATABASE_ID, MEMBERS_ID, WORKSPACES_ID} from "@/config";
import {redirect} from "next/navigation";
import {getMember} from "@/features/members/utils";
import {Workspace} from "@/features/workspaces/types";
import {createSessionClient} from "@/lib/appwrite";
import {Member} from "@/features/members/types";

interface GetWorkspaceProps {
  workspaceId: string;
}

export const getWorkspace = async ({workspaceId}: GetWorkspaceProps) =>
{
    const {databases, account} = await createSessionClient();
    const user = await  account.get();

    const member = await getMember({databases, workspaceId, userId: user.$id});
    if (!member) {
        throw new Error("Unauthorized");
    }

    return await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId);
}

export const getWorkspaceInfo = async ({workspaceId}: GetWorkspaceProps) =>
{
    const {databases} = await createSessionClient();

    const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId);

    return {
        name: workspace.name
    }
}

export const getWorkspaces = async () =>
{
    const {databases, account} = await createSessionClient();
    const user = await  account.get();

    const members = await databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId", user.$id)],
    );

    if (members.total === 0) {
        return { documents: [], total: 0};
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);
    return await databases.listDocuments<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        [
            Query.orderDesc("$createdAt"),
            Query.contains("$id", workspaceIds)
        ]);
}

export const checkWorkspaceRoute = async () => {
    const workspaces = await getWorkspaces();
    if (workspaces.total === 0) {
        redirect("/workspaces/create");
    }
    else {
        redirect(`/workspaces/${workspaces.documents[0].$id}`);
    }
};
