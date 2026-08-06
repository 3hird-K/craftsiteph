import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AOSInit } from "@/components/providers/AOSInit";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://craftsiteph.com"),
  title: "craftsiteph — Visual Website Builder & Page Design Studio",
  description:
    "Customize components, choose modern layout designs, drag & drop layers, and build your live website with a visual builder.",
  openGraph: {
    title: "craftsiteph — Visual Website Builder",
    description:
      "Customize components, choose modern layout designs, drag & drop layers, and build your live website with a visual builder.",
    siteName: "craftsiteph",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "craftsiteph Visual Website Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "craftsiteph — Visual Website Builder",
    description:
      "Customize components, choose modern layout designs, drag & drop layers, and build your live website with a visual builder.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,500;0,700;1,500&family=Outfit:wght@500;600;700;800&family=Pacifico&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&family=Roboto:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('craftsite-theme') === 'dark' || (!('craftsite-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </AuthProvider>
        </QueryProvider>
        <AOSInit />
      </body>
    </html>
  );
}
