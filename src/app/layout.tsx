import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Pro",
  description: "Dashboard de tareas",
  authors: [
    {
      name: "Gustavo Lucena",
      url: "https://github.com/GusGyoCode",
    }
  ],
  keywords: ["Task Pro", "Dashboard", "Tareas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
