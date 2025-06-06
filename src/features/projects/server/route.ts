import {Hono} from 'hono';
import {sessionMiddleware} from "@/lib/session-middleware";
import {zValidator} from "@hono/zod-validator";
import {createProjectSchema, getProjectsSchema, updateProjectSchema} from "@/features/projects/schemas";
import {getMember} from "@/features/members/utils";
import {DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID} from "@/config";
import {ID, Query} from "node-appwrite";
import {Project} from "@/features/projects/types";

const app = new Hono()
    .get(
        "/",
        sessionMiddleware,
        zValidator("query", getProjectsSchema),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const {workspaceId} = c.req.valid("query");
            if (!workspaceId) {
                return c.json({error: "No workspace id found."}, 400);
            }

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id
            });

            if (!member) {
                return c.json({error: "Unauthorized"}, 401);
            }

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                [
                    Query.equal("workspaceId", workspaceId),
                    Query.orderDesc("$createdAt")
                ]
            );

            return c.json({data: projects});
        }
    )
    .post(
        "/",
        zValidator("form", createProjectSchema),
        sessionMiddleware,
        async(c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const {name, image, workspaceId} = c.req.valid("form");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id
            });
            if (!member) {
                return c.json({error: "Unauthorized"}, 401);
            }

            let uploadedImageUrl: string | undefined;
            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );
                const arrayBuffer = await storage.getFileView(IMAGES_BUCKET_ID, file.$id);
                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            }

            const project = await databases.createDocument(
                DATABASE_ID,
                PROJECTS_ID,
                ID.unique(),
                {
                    name: name,
                    imageUrl: uploadedImageUrl,
                    workspaceId                }
            );

            return c.json({data: project})
        })
    .patch(
        "/:projectId",
        sessionMiddleware,
        zValidator("form", updateProjectSchema),
        async (c) => {
            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const {projectId} = c.req.param();
            const {name, image} = c.req.valid("form");

            const existingProject = await databases.getDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            const member = await getMember({
                databases,
                workspaceId: existingProject.workspaceId,
                userId: user.$id});
            if (!member) {
                return c.json({error: "Unauthorized"}, 401);
            }

            let uploadedImageUrl: string | undefined;
            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );
                const arrayBuffer = await storage.getFileView(IMAGES_BUCKET_ID, file.$id);
                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            } else {
                uploadedImageUrl = image;
            }

            const project = await databases.updateDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectId,
                {
                    name: name,
                    imageUrl: uploadedImageUrl
                }
            );

            return c.json({data: project});
        }
    )
    .delete(
        "/:projectId",
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const {projectId} = c.req.param();

            const existingProject = await databases.getDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            const member = await getMember({
                databases,
                workspaceId: existingProject.workspaceId,
                userId: user.$id});
            if (!member) {
                return c.json({error: "Unauthorized"}, 401);
            }

            await databases.deleteDocument(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            return c.json({data: {$id: existingProject.$id}});
        }
    );

export default app;