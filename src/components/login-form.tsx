"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useActionState } from "react";
import { login, LoginState } from "@/app/(auth)/login/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader } from "lucide-react";

export function LoginForm() {
    const [state, formAction, pending] = useActionState<LoginState, FormData>(
        login,
        {
            success: null,
            message: ""
        }
    )

    return (
        <div className="flex flex-col gap-2">

            <Card className="flex flex-col mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Meu Amigo Mistério | Sorteador de Amigo Secreto</CardTitle>
                    <CardDescription className="flex flex-col gap-2">
                        Com o app Meu Amigo Mistério, é possível criar grupos de amigos e realizar sorteios virtuais, recebendo tudo em seu email. Fica fácil se conectar com seus amigos 😀
                    </CardDescription>
                </CardHeader>
                

            </Card>

            <Card className="flex flex-col mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center"> Login </CardTitle>
                    <CardDescription className="">
                        Você receberá um link na caixa de entrada do seu endereço de e-mail, que permitirá se logar em nossa plataforma.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="Digite o seu e-mail..." required></Input>

                            </div>

                            {state.success === true && (
                                <Alert className="flex flex-col items-center">
                                    <AlertTitle className="text-green-600">E-mail enviado!</AlertTitle>
                                    <AlertDescription>Confire a sua caixa de entrada para ter acesso.</AlertDescription>
                                </Alert>
                            )}

                            {state.success === false && (
                                <Alert className="flex flex-col items-center">
                                    <AlertTitle className="text-red-600">E-mail não enviado!</AlertTitle>
                                    <AlertDescription>Por favor, entre em contato com o suporte.</AlertDescription>
                                </Alert>
                            )}

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
                                {pending && <Loader className="animate-spin" />}
                                Logar
                            </Button>
                        </div>
                    </form>
                </CardContent>

            </Card>
        </div>
    )
}