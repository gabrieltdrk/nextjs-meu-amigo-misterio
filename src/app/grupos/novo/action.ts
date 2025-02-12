import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export type CreateGroupState = {
    success: null | boolean;
    message?: string
}

export async function CreateGroup(
    _previousState: CreateGroupState,
    formData: FormData
) {
    const supabase = await createClient();

    const { data: authUser, error: authError } = await supabase.auth.getUser();

    if (authError) {
        return {
            success: false,
            message: "Erro durante a criação do grupo."
        }
    }

    const names = formData.getAll("name");
    const emails = formData.getAll("email");
    const groupName = formData.get("group-name");

    // Criação de grupo
    const { data: newGroup, error } = await supabase.from("groups").insert({
        name: groupName,
        owner_id: authUser?.user.id
    }).select().single()

    if (error) {
        return {
            success: false,
            message: "Erro ao criar grupo, por favor, tente novamente."
        }
    }

    const participants = names.map((name, index) => ({
        group_id: newGroup.id,
        name,
        email: emails[index]
    }));

    const { data: createdParticipants, error: errorParticipants } = await supabase
        .from("participants")
        .insert(participants)
        .select()

    if (errorParticipants) {
        return {
            success: false,
            message: "Erro ao adicionar amigos no grupo, por favor, tente novamente."
        }
    }

    const drawnParticipants = drawGroup(createdParticipants)

    const { error: errorDrawn } = await supabase
        .from("participants")
        .upsert(drawnParticipants)

    if (errorDrawn) {
        return {
            success: false,
            message: "Erro ao embaralhar amigos no grupo, por favor, tente novamente."
        }
    }

    redirect(`/grupos/${newGroup.id}`)
}

type Participant = {
    id: string;
    group_id: string;
    name: string;
    assigned_to: string | null
    created_at: string

}

function drawGroup(participants: Participant[]) {
    const selectedParticipants: string[] = [];

    return participants.map((participant) => {
        const availableParticipants = participants.filter((p) => p.id !== participant.id && !selectedParticipants.includes(p.id)
        )

        const assignedParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)]

        selectedParticipants.push(assignedParticipant.id)

        return {
            ...participant,
            assigned_to: assignedParticipant.id
        }
    })
}