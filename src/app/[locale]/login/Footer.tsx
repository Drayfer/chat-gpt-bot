"use client";

import Link from "@/components/Link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <div>
      <div className="h-[1px] bg-slate-300/50 mb-3 mt-6" />
      <div className="flex justify-between flex-wrap">
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="https://t.me/chat_gpt_application"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("developer")}
        </Link>
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="/upgrade"
        >
          {t("price")}
        </Link>
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="/agreement"
        >
          {t("agreement")}
        </Link>
        <Link
          className="text-white font-bold w-1/2 md:w-1/4 text-center mb-3"
          href="/privacy"
        >
          {t("privacy")}
        </Link>
      </div>
    </div>
  );
}
