import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "CCTRDG // REV-01",
  description: "Counter-Clockwise R&D Group",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      {/* We removed the white background and default Navbar here */}
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}