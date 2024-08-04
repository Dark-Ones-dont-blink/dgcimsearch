import type { Metadata } from "next";
import { Roboto, Anton } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Buscador de esbirros",
  description: "Buscador de esbirros",
  authors: [{ name: "Dark Ones" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="theme" lang="en">
      <body className={`${roboto.variable} ${anton.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
