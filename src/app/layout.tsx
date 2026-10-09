import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: "FIXORA — Service auto, mai simplu ca oricând",
  description: "Programează-te online la service-ul auto preferat. Rapid, simplu, fără apeluri telefonice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-[Inter,system-ui,sans-serif] antialiased bg-white text-[#1E1E1E]">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
