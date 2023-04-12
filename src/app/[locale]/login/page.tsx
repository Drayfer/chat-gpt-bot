"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GoogleSvg from "./svg/googleSvg";
import AIimg from "../svg/ai.webp";
import Image from "next/image";
import Footer from "./Footer";
import { useLocale, useTranslations } from "next-intl";
import { Select } from "antd";
import { useState } from "react";

export default function Login() {
  const { data: session } = useSession();
  const locale = useLocale();
  const t = useTranslations("login");
  const [language, setLanguage] = useState(locale);

  if (session) {
    redirect(`/${locale}`);
  }

  const handleChange = (value: string) => {
    setLanguage(value);
    window.location.href = window.location.origin + "/" + value;
  };

  return (
    <div className="flex justify-start text-[#D1D5DA] flex-col container mx-auto px-4 relative">
      <Select
        defaultValue={language}
        className="absolute right-4 top-4 text-white"
        onChange={handleChange}
        bordered={false}
        suffixIcon={<span style={{ color: "white" }}>▼</span>}
        options={[
          { value: "en", label: "EN" },
          { value: "ru", label: "RU" },
          { value: "uk", label: "UK" },
        ]}
      />

      <div className="flex justify-start items-center flex-col pt-40 ">
        <Image src={AIimg} width={60} height={60} alt="ai_image" />
        <div className="text-3xl mb-14 mt-2">GPT AI Chat Bot</div>
        <button
          className="bg-[#4C82E5] p-3 text-lg rounded-sm flex items-center"
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
        >
          <div className="bg-white h-9 w-9 mr-3">
            <GoogleSvg />
          </div>
          <span>{t("signIn")}</span>
        </button>
      </div>
      <div className="text-justify mt-40 text-sm">
        <p className="mb-6">{t("p1")}</p>

        <p className="mb-6">{t("p2")}</p>

        <p className="mb-6">{t("p3")}</p>

        <p className="mb-6">{t("p4")}</p>

        <p className="mb-6">{t("p5")}</p>

        <p className="mb-6">{t("p6")}</p>

        <p className="mb-6">{t("p7")}</p>
      </div>

      <Footer />
    </div>
  );
}
