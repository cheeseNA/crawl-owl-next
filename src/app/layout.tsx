import { Header } from "@/components/Header";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crawl Owl",
  description: "crawl and notify with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="mx-auto max-w-[1024px] px-6 py-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
