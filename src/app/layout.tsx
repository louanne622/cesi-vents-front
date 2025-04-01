import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CESI vents",
  description: "Découvrez les évènements de Cesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans antialiased bg-gray-50 min-h-screen`}>
        <Navbar />
        {/* Contenu principal sans le padding-top */}
        <main className="md:pl-64 pb-16 md:pb-8">
          <div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
