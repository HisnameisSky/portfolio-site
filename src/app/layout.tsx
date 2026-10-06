import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Illustrations & Development Projects",
};

// 必ず function RootLayout で export default されているか確認！
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* ✨ suppressHydrationWarning を追加するだけ */
    <html lang="ja" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}