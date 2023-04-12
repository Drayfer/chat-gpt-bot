"use client";

import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PlayMarket from "./../images/playMarket.webp";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <div>
      <div className="h-[1px] bg-slate-300/50 mb-3 mt-6" />
      <div className="flex md:justify-between justify-center flex-col items-center">
        <div className="md:flex justify-between flex-wrap">
          <Link
            className="text-white font-bold w-auto mr-5 text-center mb-3 flex items-center justify-center"
            href="/contacts"
          >
            {t("developer")}
          </Link>
          <Link
            className="text-white font-bold w-auto mr-5 text-center mb-3 flex items-center justify-center"
            href="/upgrade"
          >
            {t("price")}
          </Link>
          <Link
            className="text-white font-bold w-auto mr-5 text-center mb-3 flex items-center justify-center"
            href="/agreement"
          >
            {t("agreement")}
          </Link>
          <Link
            className="text-white font-bold w-auto mr-5 text-center mb-3 flex items-center justify-center"
            href="/privacy"
          >
            {t("privacy")}
          </Link>
        </div>
        <Link
          href="https://play.google.com/store/apps/details?id=com.gptaichat.bot"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5"
        >
          <Image
            src={PlayMarket}
            alt="googlePlay"
            width={200}
            className="rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
