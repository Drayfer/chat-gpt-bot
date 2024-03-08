"use client";
import { Button } from "antd";
import NextImage from "next/image";
import { RefObject, Suspense, useState } from "react";
import EmptyImage from "./images/empty-image.png";
import { RotatingLines } from "react-loader-spinner";
import { useTranslations } from "next-intl";

export interface IBotImageMessage {
  link: string;
  chatRef: RefObject<HTMLDivElement>;
}

const downloadImage = (base64String: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = base64String;
  a.download = fileName;
  a.click();
};

export default function BotImageMessage({ link, chatRef }: IBotImageMessage) {
  const t = useTranslations("app");
  const [isValidImage, setIsValidImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const img: HTMLImageElement = new Image();
  img.onload = function () {
    setIsValidImage(true);
    srollToBottom();
    setIsLoading(false);
  };
  img.onerror = function () {
    setIsValidImage(false);
    srollToBottom();
    setIsLoading(false);
  };
  img.src = link;

  const srollToBottom = () => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    );
  }

  return (
    <>
      <Suspense
        fallback={
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        }
      >
        {isValidImage ? (
          <>
            <NextImage
              src={link}
              width={500}
              height={500}
              alt="generated_image"
            />

            <Button
              onClick={() => downloadImage(link, "ai_generated_image.png")}
              className="mt-3 text-white/70 underline"
            >
              {t("download")}
            </Button>
          </>
        ) : (
          <NextImage
            src={EmptyImage}
            width={200}
            height={200}
            alt="not available"
          />
        )}
      </Suspense>
    </>
  );
}
