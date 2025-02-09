"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useActionState } from "react";
import { login, LoginState } from "@/app/(auth)/login/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader, MessageCircle } from "lucide-react";

export function LoginForm() {
    const [state, formAction, pending] = useActionState<LoginState, FormData>(
        login,
        {
            success: null,
            message: ""
        }
    )

    return (
        <Card className="flex flex-col mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center"> Login </CardTitle>
                <CardDescription className="">
                    Você receberá em seu e-mail, um link para realizar o login em nossa plataforma.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="Digite aqui o seu e-mail." required></Input>

                        </div>

                        {state.success === true && (
                            <Alert className="flex flex-col items-center">
                                <AlertTitle className="text-green-600">E-mail enviado!</AlertTitle>
                                <AlertDescription>Confira a sua caixa de entrada para acessar.</AlertDescription>
                            </Alert>
                        )}

                        {state.success === false && (
                            <Alert className="flex flex-col items-center">
                                <AlertTitle className="text-red-600">E-mail não enviado!</AlertTitle>
                                <AlertDescription>Por favor, entre em contato com o suporte.</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full">
                            {pending && <Loader className="animate-spin" />}
                            Login
                        </Button>
                    </div>
                </form>
            </CardContent>

        </Card>
    )
}