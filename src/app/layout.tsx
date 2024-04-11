import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/API/firebase_auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "myRecycling - Home Page",
  description: "Track and uplift your at-home recylcing using myRecycling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
