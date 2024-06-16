import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const title = "🤝 Wokehub";
  const description = "Search Who is Woke on Github!";
  return {
    title,
    description,
    openGraph: {
      images: ["https://wokehub.lol/og.png"],
      description,
      title,
      type: "website",
    },
    twitter: {
      images: ["https://wokehub.lol/og.png"],
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
