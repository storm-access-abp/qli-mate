import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

export const metadata: Metadata = {
  title: "Qli-Mate",
  description: "Informações meteorológicas detalhadas e confiáveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster richColors/>
      </body>
    </html>
  );
}
