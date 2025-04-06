import {z} from "zod";
import {MemberRole} from "@/features/members/types";

export const getMembersSchema = z.object({
    workspaceId: z.string().trim(),
});

export const updateMemberRoleSchema = z.object({
    role: z.nativeEnum(MemberRole),
});