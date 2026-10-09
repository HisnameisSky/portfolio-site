import type { Metadata } from "next";
import { Shippori_Mincho, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "澄界 ｜ Hisnameissky",
  description: "心惹かれるイラストレーションの世界と、モダンなWebテクノロジーが融合する場所。",
  openGraph: {
    title: "澄界 ｜ Hisnameissky",
    description: "心惹かれるイラストレーションの世界と、モダンなWebテクノロジーが融合する場所。",
    url: "https://hisnameissky.pages.dev/", // <== PagesのデフォルトURLまたは独自のカスタムドメイン
    siteName: "澄界 ｜ Hisnameissky",
    images: [
      {
        url: "/images/IMG_6504.webp",
        width: 1200,
        height: 630,
        alt: "澄界 Portfolio Preview",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "澄界 ｜ Hisnameissky",
    description: "心惹かれるイラストレーションの世界と、モダンなWebテクノロジーが融合する場所。",
    images: ["/images/IMG_6504.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${shipporiMincho.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}