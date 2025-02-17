import { LoginForm } from "@/components/login-form";
import Image from 'next/image'


export default function LoginPage() {
    return(
        <div className="h-screen flex items-center justify-center m-auto px-8 gap-8 flex-col lg:flex-row max-w-5xl">
            <Image 
                className="rounded-lg"
                width='400'
                height='400'
                src="/homepage.jpg"
                alt="Teste"
                />
            <LoginForm />
        </div>
    )
}