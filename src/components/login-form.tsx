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
        <Card className="flex flex-col mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center"> Login </CardTitle>
                <CardDescription className="">
                You will receive a link in your email to log in to our platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="Enter your email..." required></Input>

                        </div>

                        {state.success === true && (
                            <Alert className="flex flex-col items-center">
                                <AlertTitle className="text-green-600">Email sent!</AlertTitle>
                                <AlertDescription>Check your inbox to access it.</AlertDescription>
                            </Alert>
                        )}

                        {state.success === false && (
                            <Alert className="flex flex-col items-center">
                                <AlertTitle className="text-red-600">E-mail não enviado!</AlertTitle>
                                <AlertDescription>Please contact support.</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full">
                            {pending && <Loader className="animate-spin" />}
                            Log In
                        </Button>
                    </div>
                </form>
            </CardContent>

        </Card>
    )
}