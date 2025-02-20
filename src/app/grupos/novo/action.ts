import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Resend } from "resend";

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

    const { error: errorResend } = await sendEmailsToParticipants(drawnParticipants, groupName as string) || {};


    if (errorResend) {
        return {
            success: false,
            message: errorResend
        }
    }

    redirect(`/grupos/${newGroup.id}`)
}

type Participant = {
    id: string;
    group_id: string;
    name: string;
    email: string;
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

async function sendEmailsToParticipants(participants: Participant[], groupName: string) {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    try {
        await Promise.all(
            participants.map(participant =>
                resend.emails.send({
                    from: 'Meu Amigo Mistério <meuamigomisterio@gabrieltdrk.com.br>',
                    to: participant.email,
                    subject: `Meu Amigo Mistério - Grupo ${groupName}`,
                    html: `<p>O grupo ${groupName} escolheu você para participar do Meu Amigo Mistério!
                    <br />
                    <br />
                    O seu amigo mistério, é: <strong>${participants.find(p => p.id === participant.assigned_to)?.name}!</strong>
                    </p>`
                })
            )
        );
    } catch(e) {
        console.error("Erro ao enviar e-mails:", e);
        return { error: "Ocorreu um erro ao enviar os e-mails" };
    }
}
