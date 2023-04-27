"use client";
import { useAppSelector } from "@/hooks/redux";
import useIsPaid from "@/hooks/useIsPaid";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";

interface IModelHeader {
  handleNewChat: () => void;
}

export default function ModelHeader({ handleNewChat }: IModelHeader) {
  const { model } = useAppSelector((state) => ({
    model: state.chat.model,
  }));
  const { isPaid } = useIsPaid();
  const t = useTranslations("app");

  const modelInfo =
    model === "image"
      ? "Midjourney"
      : isPaid
      ? "gpt-3.5-turbo (context)"
      : "gpt-3.5-turbo";

  return (
    <div className="p-2 py-0 border-2 border-white/20 text-white/50 text-xs flex justify-between items-center">
      <div>
        <span className="font-light">{t("model")}:</span>{" "}
        <span className="font-bold">{modelInfo}</span>
      </div>
      <Button
        className="p-2 m-0 h-100 text-white border-0 flex justify-center items-center hover:bg-white/10"
        onClick={handleNewChat}
      >
        <PlusOutlined className="text-xs" />
      </Button>
    </div>
  );
}
