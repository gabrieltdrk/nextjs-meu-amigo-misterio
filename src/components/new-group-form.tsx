"use client"

import { useActionState, useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader, Mail, Trash2, PlusCircle } from "lucide-react"
import { Separator } from "./ui/separator"
import { CreateGroup, type CreateGroupState } from "@/app/grupos/novo/action"
import { useToast } from "@/hooks/use-toast"

interface Participant {
  name: string
  email: string
}

export function NewGroupForm({ loggedUser }: { loggedUser: { id: string; email: string } }) {
  const { toast } = useToast()
  const [participants, setParticipants] = useState<Participant[]>([{ name: "", email: loggedUser.email }])
  const [groupName, setGroupName] = useState("")

  const [state, formAction, pending] = useActionState<CreateGroupState, FormData>(CreateGroup, {
    success: null,
    message: "",
  })

  function updateParticipant(index: number, field: keyof Participant, value: string) {
    const updatedParticipants = [...participants]
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
        description: state.message,
      })
    }
  }, [state, toast])

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gray-50 text-orange-900 drop-shadow-lg border-orange-500">
      <CardHeader className="bg-orange-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Novo Grupo</CardTitle>
        <CardDescription className="text-orange-100 font-bold">Convide os seus amigos para se juntar!</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="p-6">
          <div className="space-y-2">
            <Label htmlFor="group-name" className="text-orange-800 font-bold">
              Nome do Grupo
            </Label>
            <Input
              id="group-name"
              name="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Informe o nome do grupo..."
              required
              className="border-orange-300 focus:border-orange-500"
            />
          </div>

          <h2 className="text-lg font-semibold text-orange-800 mt-8 mb-4">Participantes</h2>
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-lg"
            >
              <div className="flex-grow space-y-2 w-full">
                <Label htmlFor={`name-${index}`} className="text-orange-800 font-bold">
                  Nome
                </Label>
                <Input
                  id={`name-${index}`}
                  name="name"
                  value={participant.name}
                  placeholder="Digite o nome do amigo..."
                  required
                  onChange={(e) => updateParticipant(index, "name", e.target.value)}
                  className="border-orange-400 focus:border-orange-800"
                />
              </div>

              <div className="flex-grow space-y-2 w-full">
                <Label htmlFor={`email-${index}`} className="text-orange-800">
                  E-mail
                </Label>
                <Input
                  id={`email-${index}`}
                  name="email"
                  value={participant.email}
                  type="email"
                  placeholder="Digite o e-mail do amigo..."
                  required
                  readOnly={participant.email === loggedUser.email}
                  onChange={(e) => updateParticipant(index, "email", e.target.value)}
                  className="border-orange-300 focus:border-orange-500"
                />
              </div>
              <div className="min-w-9">
                {participants.length > 1 && participant.email !== loggedUser.email && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeParticipant(index)}
                    className="border-orange-500 text-orange-500 hover:bg-orange-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 p-6">
          <Button
            type="button"
            variant="outline"
            onClick={addParticipant}
            className="w-full md:w-auto text-white bg-orange-700 hover:bg-orange-800"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar novo amigo
          </Button>
          <Button className="flex items-center space-x-2 w-full md:w-auto bg-orange-700 hover:bg-orange-800 text-white">
            <Mail className="w-4 h-4 mr-2" />
            Criar grupo e enviar emails!
            {pending && <Loader className="animate-spin ml-2" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

