'use client'

import { useActionState, useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader, Mail, Trash2 } from "lucide-react"
import { Separator } from "./ui/separator"
import { CreateGroup, CreateGroupState } from "@/app/grupos/novo/action"
import { useToast } from "@/hooks/use-toast"

interface Participant {
    name: string,
    email: string
}

export function NewGroupForm({ loggedUser }: { loggedUser: { id: string, email: string } }) {
    const { toast } = useToast();
    const [participants, setParticipants] = useState<Participant[]>([
        { name: "", email: loggedUser.email },
    ])
    const [groupName, setGroupName] = useState("")

    const [state, formAction, pending] = useActionState<CreateGroupState, FormData>(CreateGroup, {
        success: null,
        message: ""
    })

    function updateParticipant(index: number, field: keyof Participant, value: string) {
        const updatedParticipants = [...participants];

        updatedParticipants[index][field] = value
        setParticipants(updatedParticipants)
    }

    function removeParticipant(index: number) {
        setParticipants(participants.filter((_, i) => i !== index))
    }

    function addParticipant() {
        setParticipants(participants.concat({ name: "", email: "" }))
    }

    useEffect(() => {
        if (state.success === false) {
            toast({
                variant: "destructive",
                description: state.message
            })
        }
    }, [state])

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Novo Grupo</CardTitle>
                <CardDescription>Convide os seus amigos para se juntar!</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="group-name">Nome do Grupo</Label>
                        <Input
                            id="group-name"
                            name="group-name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Informe o nome do grupo..."
                            required
                        />
                    </div>

                    <h2 className="!mt-12"></h2>
                    {participants.map((participant, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex-grow space-y-2 w-full">
                                <Label htmlFor={`name-${index}`}>Nome</Label>
                                <Input 
                                    id={`name-${index}`} 
                                    name="name" 
                                    value={participant.name} 
                                    placeholder="Digite o nome do amigo..." 
                                    required 
                                    onChange={(e) => {
                                    updateParticipant(index, "name", e.target.value)
                                }} />
                            </div>
                            <div className="flex-grow space-y-2 w-full">
                                <Label htmlFor={`email-${index}`}>E-mail</Label>
                                <Input
                                    id={`email-${index}`}
                                    name="email"
                                    value={participant.email}
                                    type="email"
                                    placeholder="Digite o e-mail do amigo..."
                                    required
                                    readOnly={participant.email === loggedUser.email} 
                                    onChange={(e) => {
                                        updateParticipant(index, "email", e.target.value)
                                    }} />
                            </div>
                            <div className="min-w-9">
                                {participants.length > 1 && participant.email !== loggedUser.email && (
                                    <Button type="button" variant="outline" size="icon" onClick={() => removeParticipant(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
                <Separator className="my-4" />
                <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                    <Button type="button" variant="outline" onClick={addParticipant} className="w-full md:w-auto">
                        Adicionar novo amigo
                    </Button>
                    <Button className="flex items-center space-x-2 w-full md:w-auto">
                        <Mail className="w-3 h-3" />
                        Criar grupo e enviar emails!
                        {pending && <Loader className="animate-spin" />}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}