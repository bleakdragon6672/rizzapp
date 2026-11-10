import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIZZ – AI Dating Assistant",
  description: "The #1 AI Dating Assistant. Instant witty, flirty, and high-impact responses for Tinder, Hinge, and Bumble.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RIZZ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full bg-black selection:bg-purple-600 selection:text-white">
      <body className="h-full bg-black text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
