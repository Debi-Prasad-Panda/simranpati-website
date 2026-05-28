import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artwords.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Art & Words by Simran",
    template: "%s | Art & Words by Simran",
  },
  description:
    "A quirky yet sophisticated portfolio blending editorial writing and visual design.",
  openGraph: {
    title: "Art & Words by Simran",
    description:
      "A quirky yet sophisticated portfolio blending editorial writing and visual design.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper-foundation text-ink-sepia">
        {children}
      </body>
    </html>
  );
}
