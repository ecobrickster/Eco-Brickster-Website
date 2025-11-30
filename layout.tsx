import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Eco-Brickster — Building Tomorrow from Today's Waste",
  description:
    "Eco-friendly, AI-optimised bricks from recycled waste. Durable, tested, customizable, and affordable.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  icons: {
    icon: "/assets/images/Logo Eco-Brickster.png",
    shortcut: "/assets/images/Logo Eco-Brickster.png",
    apple: "/assets/images/Logo Eco-Brickster.png",
  },
  openGraph: {
    title: "Eco-Brickster",
    description:
      "Transforming plastic waste into powerful building blocks for homes, schools, and communities.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: ["300","400","500","600","700","800"], variable: "--font-poppins" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-white text-slate-900 dark:bg-dark dark:text-slate-100 antialiased ${poppins.className}`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
