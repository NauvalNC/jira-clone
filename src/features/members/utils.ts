import {Query, type Databases} from "node-appwrite"
import {DATABASE_ID, MEMBERS_ID} from "@/config";
import {Member} from "@/features/members/types";

interface GetMemberProps {
    databases: Databases;
    workspaceId: string;
    userId: string;
}

export const getMember = async ({databases, workspaceId, userId}: GetMemberProps) => {
    const members = await databases.listDocuments<Member>(
        DATABASE_ID,
        MEMBERS_ID,
        [
            Query.equal("workspaceId", workspaceId),
            Query.equal("userId", userId)
        ]
    );

    return members.documents.length > 0 ? members.documents[0] : null;
};