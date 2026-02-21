import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.brandName,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
