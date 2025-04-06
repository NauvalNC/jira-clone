import {checkAuthenticatedRoute} from "@/features/auth/queries";
import {checkWorkspaceRoute} from "@/features/workspaces/queries";

const Page = async () => {
    await checkAuthenticatedRoute(true, "/sign-in");
    await checkWorkspaceRoute();
};

export default Page;