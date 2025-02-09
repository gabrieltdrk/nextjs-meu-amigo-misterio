import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Amigo Secreto",
  description: "Crie grupos e faça o seu amigo secreto mais divertido!",
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
      </body>
    </html>
  );
}
