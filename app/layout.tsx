import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "ƎƧIWʞƆOIƆ // Backward We Go",
  description: "Counter-Clockwise R&D Group",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    /* suppressHydrationWarning prevents errors from browser extensions */
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}