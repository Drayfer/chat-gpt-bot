"use client";

import { images } from "@/constants";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";

export default function ImageStartDialog() {
  const t = useTranslations("app");

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * images.length);
  }, []);

  return (
    <>
      <div className="text-3xl flex justify-center items-center flex-col h-full">
        <p>Midjourney</p>
        <p className="text-base text-center mt-4 font-light">{t("askImage")}</p>
        <p className="text-base text-center font-semibold flex items-center mt-3">
          <CheckCircleOutlined className="text-green-500 pr-2" /> {t("useEng")}.
        </p>
        <div className="bg-slate-700 p-4 text-center mt-6 w-4/6">
          <div className="mb-2 font-normal text-lg underline">
            {t("example")}:
          </div>
          <div className="text-sm font-thin font-mono">
            {images[randomNumber].text}
          </div>
          <div className="w-2/3 mt-3 md:w-1/5 mx-auto">
            <Image
              src={images[randomNumber].img}
              alt="image_example"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
