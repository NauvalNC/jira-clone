import "server-only";

import {Client, Account, Users, Databases} from "node-appwrite"
import {cookies} from "next/headers";
import {AUTH_COOKIE} from "@/features/auth/constants";

export const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
    const session = cookies().get(AUTH_COOKIE);
    if (!session || !session.value) {
        throw new Error("Unauthorized");
    }

    client.setSession(session.value);

    return {
        get account(): Account {
            return new Account(client);
        },
        get databases(): Databases {
            return new Databases(client);
        }
    }
};

export const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account(): Account {
            return new Account(client);
        },
        get users(): Users {
            return new Users(client);
        }
    }
};