import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import MobileNavbar from "@/components/MobileNavbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Organic Sanctuary - Hunian Asri Terjangkau",
  description: "Wujudkan impian memiliki rumah dengan konsep nature-living yang terjangkau. Subsidi pemerintah, lokasi strategis, siap huni.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-body pb-16 md:pb-0">
        {children}
        <WhatsAppButton variant="floating" />
        <MobileNavbar />
      </body>
    </html>
  );
}
