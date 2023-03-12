"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "./../store/store";
interface IProps {
  children: ReactNode;
}

function Providers({ children }: IProps) {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
}

export default Providers;
