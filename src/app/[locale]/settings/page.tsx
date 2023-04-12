"use client";

import Link from "@/components/Link";
import { useTranslations, useLocale } from "next-intl";
import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";

export default function Page() {
  const t = useTranslations("settings");
  const locale = useLocale();
  const [language, setLanguage] = useState(locale);

  const handleSelect = (e: RadioChangeEvent) => {
    setLanguage(e.target.value);
    window.location.href = window.location.origin + "/" + e.target.value;
  };

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4 h-screen flex flex-col justify-start">
      <div className="mb-10 text-xl">
        <Link href="/" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("settings")}
      </div>
      <div className="flex justify-center items-center flex-col flex-1">
        <h1 className="text-xl mb-6 font-bold">Choose language:</h1>
        <Radio.Group
          value={language}
          onChange={handleSelect}
          defaultValue={"ru"}
        >
          <Radio.Button value="en">EN</Radio.Button>
          <Radio.Button value="ru">RU</Radio.Button>
          <Radio.Button value="uk">UK</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
}
