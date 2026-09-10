import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Log Management System",
  description: "Multi-tenant security log management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}