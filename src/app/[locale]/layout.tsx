// "use client";

import "./globals.css";
import Providers from "./Providers";
import { redirect } from "next/navigation";
// import "antd/dist/reset.css";

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    redirect("/");
  }

  return (
    <html lang={locale}>
      <head />
      <body className="bg-[#434654] h-screen mx-auto">
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
