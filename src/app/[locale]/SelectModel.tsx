"use client";

import { useAppDispatch } from "@/hooks/redux";
import useIsPaid from "@/hooks/useIsPaid";
import { setModel, TModel } from "@/store/chatSlice";
import { CrownOutlined } from "@ant-design/icons";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function SelectModel() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isPaid } = useIsPaid();
  const t = useTranslations("app");
  const locale = useLocale();

  const handleModel = (modelType: TModel) => {
    if (modelType === "image" && !isPaid) {
      router.push(`/${locale}/upgrade`);
      return;
    }
    dispatch(setModel(modelType));
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full">
        <p className="text-4xl mb-3 font-bold">AI Chat Assistant</p>
        <p className="text-xl mb-3 font-extralight">{t("choose")}:</p>

        <div
          className="flex flex-col justify-center items-center bg-slate-500 p-4 mb-4 cursor-pointer w-72"
          onClick={() => handleModel("gpt")}
        >
          <div className="text-lg font-bold mb-2">AI Chat</div>
          <div className="text-sm font-light text-center">{t("textAi")}</div>
        </div>

        {/* <div
          className={`flex flex-col justify-center items-center bg-slate-500 ${
            isPaid ? "opacity-100" : "opacity-60"
          } p-4 cursor-pointer w-72 mb-4  `}
          onClick={() => handleModel("gpt4")}
        >
          <div className="text-lg font-bold mb-2 flex items-center">
            <CrownOutlined
              className="text-[#FFBA00] mr-2"
              style={{ fontSize: 18, paddingLeft: 5 }}
            />{" "}
            Open AI (GPT4)
          </div>
          <div className="text-sm font-light text-center">
            Last version of AI Chat Assistant assistent
          </div>
        </div> */}
        <div
          className={`flex flex-col justify-center items-center bg-slate-500 ${
            isPaid ? "opacity-100" : "opacity-60"
          } p-4 cursor-pointer w-72`}
          onClick={() => handleModel("image")}
        >
          <div className="text-lg font-bold mb-2 flex items-center">
            <CrownOutlined
              className="text-[#FFBA00] mr-2"
              style={{ fontSize: 18, paddingLeft: 5 }}
            />{" "}
            Midjourney
          </div>
          <div className="text-sm font-light">{t("textImage")}</div>
        </div>
      </div>
    </>
  );
}
