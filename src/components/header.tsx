'use client'

import { usePathname } from "next/navigation";
import { Gift, LogOut, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/app/(auth)/login/actions";

export function Header() {

    const pathname = usePathname();
    const isHome = pathname === '/login' ? true : false

    return (
        <header className="border-b bg-orange-500 p-3 text-white">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold flex items-center gap-2 hover:animate-pulse">
                            <Gift className="h-6 w-6 text-white" />
                            <span>Meu Amigo Mistério</span>
                        </Link>
                        <span className="border border-black h-8 select-none" />
                        <nav className={`${isHome ? 'hidden' : 'flex items-center gap-4'}`}>
                            <Link
                                href="/grupos"
                                className="bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 inline-flex items-center"
                            >
                                <Users className="w-4 h-4 mr-2" />
                                Meus Grupos
                            </Link>
                            <Link
                                href="/grupos/novo"
                                className="bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded-full transition duration-300 inline-flex items-center"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                Novo Grupo
                            </Link>
                        </nav>

                    </div>
                    <nav className={`${isHome ? 'hidden' : 'flex items-center gap-4'}`}>
                        <Button onClick={signOut} className="bg-orange-700 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 inline-flex items-center">
                            <LogOut className="w-4 h-4" />
                            Sair
                        </Button>
                    </nav>

                </div>

            </div>

        </header>
    )
}