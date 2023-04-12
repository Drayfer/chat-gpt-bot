"use client";

import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import Footer from "../login/Footer";

export default function Login() {
  const t = useTranslations("privacy");
  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4">
      <div className="mb-10 text-xl">
        <Link href="/" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("privacy")}
      </div>
      <h1 className="text-3xl mb-6 font-bold">{t("privacy")}</h1>
      <p className="mb-6">{t("p1")}</p>
      <p className="mb-6">{t("p2")}</p>

      <p className="mb-6">{t("p3")}</p>

      <p className="mb-6">{t("p4")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p5")}</h2>

      <p className="mb-6">{t("p6")}</p>

      <p className="mb-6">{t("p7")}</p>

      <p className="mb-6">{t("p8")}</p>
      <ul className="mb-6">
        <li>
          <a
            className="underline"
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("p9")}
          </a>
        </li>
      </ul>

      <h2 className="text-xl mb-6 font-bold">{t("p10")}</h2>

      <p className="mb-6">{t("p11")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p12")}</h2>

      <p className="mb-6">{t("p13")}</p>
      <p className="mb-6">{t("p14")}</p>
      <h2 className="text-xl mb-6 font-bold">{t("p15")}</h2>
      <p className="mb-6">{t("p16")}</p>
      <ul className="mb-6">
        <li>{t("p17")}</li>
        <li>{t("p18")}</li>
        <li>{t("p19")}</li>
        <li>{t("p20")}</li>
      </ul>
      <p className="mb-6">{t("p21")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p22")}</h2>
      <p className="mb-6">{t("p23")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p24")}</h2>
      <p className="mb-6">{t("p25")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p26")}</h2>
      <p className="mb-6">{t("p27")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p28")}</h2>
      <p className="mb-6">{t("p29")}</p>

      <p className="mb-6">{t("p30")}</p>

      <h2 className="text-xl mb-6 font-bold">{t("p31")}</h2>
      <p className="mb-6">
        {t("p32")}{" "}
        <a
          className="underline"
          href="https://t.me/chat_gpt_application"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://t.me/chat_gpt_application
        </a>
        .
      </p>
      <Footer />
    </div>
  );
}
