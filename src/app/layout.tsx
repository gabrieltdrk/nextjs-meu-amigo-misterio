import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Secret Santa",
  description: "Create group and make your Secret Santa even more fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  );
}
