import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gestão do Fluxo de Contratação",
  description: "Dashboard executivo para gestão de contratos e processos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className={`${inter.className} min-h-full bg-[#f1f4f7] text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
