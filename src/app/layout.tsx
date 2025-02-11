import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Meu Amigo Mistério",
  description: "Sorteador de amigo secreto - Faça do seu amigo secreto ainda mais divertido!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body className="bg-gray-50">
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
