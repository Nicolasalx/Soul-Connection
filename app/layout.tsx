import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soul Connection",
  description: "Client management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={inter.className}>
        <div className="flex-none w-0 md:flex-2 md:w-[20%]">
          <NavBar />
        </div>
        <div className="flex flex-auto md:flex-3 justify-center w-full md:w-[80%]">
          {children}
        </div>
      </body>
    </html>
  );
}
