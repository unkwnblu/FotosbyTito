import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fotosbytito.com'), // Replace with actual domain when deployed
  title: "Fotos By Tito | A Visual Odyssey",
  description: "Capturing the unspoken physics of light and shadow. A cinematic journey into the soul of the moment.",
  keywords: ["photography", "cinematic", "film noir", "art", "portfolio", "fotosbytito"],
  openGraph: {
    title: "Fotos By Tito | A Visual Odyssey",
    description: "Capturing the unspoken physics of light and shadow.",
    url: "https://fotosbytito.com",
    siteName: "Fotos By Tito",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/cinematic-bg.png",
        width: 1200,
        height: 630,
        alt: "Fotos By Tito Cinematic Background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotos By Tito",
    description: "Capturing the unspoken physics of light and shadow.",
    images: ["/cinematic-bg.png"],
  },
  icons: {
    icon: '/logo.png', // Corrected path: public folder contents are served at root
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
