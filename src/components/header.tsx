'use client'

import { Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/app/(auth)/login/actions";
import { usePathname } from 'next/navigation'

export function Header() {
    const pathname = usePathname();

    return (
        <header className={`${pathname !== '/login' ? "border-b" : 'hidden'}`}>
            <div className="container mx-auto p-4">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                            <Gift className="h-6 w-6 text-red-400 hover:h-7 hover:w-7 transition-all" />
                            <span>Meu Amigo Mistério</span>
                        </Link>
                        <span className="border border-black h-8 select-none" />
                        <nav className="flex items-center gap-4">
                            <Button asChild className="variant bg-blue-600 rounded-md hover:bg-blue-500" >
                                <Link href="/grupos">Meus Grupos</Link>
                            </Button>
                            <Button asChild className="variant bg-blue-600 rounded-md hover:bg-blue-500" >
                                <Link href="/grupos/novo">Novo Grupo</Link>
                            </Button>
                        </nav>

                    </div>
                    <nav>
                        <Button onClick={signOut} className="variant bg-blue-600 rounded-sm hover:bg-blue-500">Sair</Button>
                    </nav>

                </div>

            </div>

        </header>
    )
}