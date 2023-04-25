"use client";

import { useTranslations } from "next-intl";

export default function ImageStartDialog() {
  const t = useTranslations("app");
  return (
    <>
      <div className="text-3xl flex justify-center items-center flex-col h-full">
        <p>Midjourney</p>
        <p className="text-base text-center mt-4 font-light">
          {t("askImage")}.
        </p>
        {/* <p className="text-base text-center font-light">{t("useEng")}...</p> */}
      </div>
    </>
  );
}
