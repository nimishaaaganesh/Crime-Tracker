'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import { usePathname } from "next/navigation"; 
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

 const metadata: Metadata = {
  title: "CRMS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 

  const excludeLayout =  pathname === '/Login';


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {!excludeLayout && <Header />}
        {children}
        {!excludeLayout && <Footer />}
      </body>
    </html>
  );
}