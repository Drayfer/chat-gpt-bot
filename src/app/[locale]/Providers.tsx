"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./../../store/store";
import { NextIntlClientProvider } from "next-intl/client";
interface IProps {
  children: ReactNode;
  locale: string;
  messages: any;
}
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "uk" }];
}

function Providers({ children, locale, messages }: IProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReduxProvider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}

export default Providers;
