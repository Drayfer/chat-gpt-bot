"use client";

import { useTranslations } from "next-intl";

export default function EmptyDialog() {
  const t = useTranslations("app");
  return (
    <>
      <div className="text-3xl flex justify-center items-center flex-col h-full">
        <p>AI Chat Assistant</p>
        <p className="text-base text-center mt-4 font-light">{t("ask")}...</p>
      </div>
    </>
  );
}
