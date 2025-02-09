import { Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/app/(auth)/login/actions";

export function Header() {
    return (
        <header className="border-b ">
            <div className="container mx-auto p-4">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                            <Gift className="h-6 w-6 text-red-400" />
                            <span>Amigo Secreto</span>
                            <span className="font-thin">Secreto</span>
                        </Link>
                        <span className="border border-black h-8 select-none" />
                        <nav className="flex items-center gap-4">
                            <Button asChild className="variant bg-gray-800 rounded-sm hover:bg-gray-600" >
                                <Link href="/grupos">Meus Grupos</Link>
                            </Button>
                            <Button asChild className="variant bg-gray-800 rounded-sm hover:bg-gray-600" >
                                <Link href="/grupos">Novo grupo</Link>
                            </Button>
                        </nav>

                    </div>
                    <nav>
                        <Button onClick={signOut} className="variant bg-gray-800 rounded-sm hover:bg-gray-600">Sair</Button>
                    </nav>

                </div>

            </div>

        </header>
    )
}