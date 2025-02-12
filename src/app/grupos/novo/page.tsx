import { NewGroupForm } from "@/components/new-group-form";
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export default async function NewGroupPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user)
        redirect('/login')

    const loggedUser = {
        id: data?.user?.id as string,
        email: data?.user?.email as string
    }

    return (
        <div className="mt-40">
            <NewGroupForm loggedUser={loggedUser} />
        </div>
    )
}