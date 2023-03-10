"use client";

import "./globals.css";
import Providers from "./Providers";
// import 'antd/dist/reset.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-[#434654] h-screen mx-auto">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
