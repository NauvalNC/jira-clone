import {redirect} from "next/navigation";
import {createSessionClient} from "@/lib/appwrite";

export const getCurrentUser = async () =>
{
    try {
        const {account} = await createSessionClient();
        return await account.get();
    } catch {
        return null;
    }
}

export const checkAuthenticatedRoute = async (isCheckAuth: boolean, reroute: string) => {
    const user = await getCurrentUser();
    if (Boolean(user) !== isCheckAuth) {
        redirect(reroute);
    }
}
