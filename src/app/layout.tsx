import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "craftsiteph — Visual Website Builder",
  description:
    "Customize components and design your own website with a live visual builder.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,500;0,700;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
