"use client";

import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import Footer from "../login/Footer";
import Image from "next/image";
import AIimg from "../svg/ai.webp";

export default function Page() {
  const t = useTranslations("contacts");

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4 min-h-screen flex flex-col justify-between">
      <div className="mb-10 text-xl">
        <Link href="/" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("contacts")}
      </div>
      <div className="flex flex-col items-center gap-5">
        <Image src={AIimg} width={100} height={100} alt="ai_image" />
        <div className="text-center">
          {t("p1")}:{" "}
          <Link
            className="text-white font-bold"
            href="https://t.me/chat_gpt_application"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/chat_gpt_application
          </Link>
        </div>
        <div>
          Email:{" "}
          <Link
            className="text-white font-bold"
            href="mailto:aigptchatbot@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            aigptchatbot@gmail.com
          </Link>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
