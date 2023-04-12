"use client";
import { Button } from "antd";
import NextImage from "next/image";
import { RefObject, Suspense, useState } from "react";
import EmptyImage from "./images/empty-image.png";
import { saveAs } from "file-saver";
import { RotatingLines } from "react-loader-spinner";

export interface IBotImageMessage {
  link: string;
  chatRef: RefObject<HTMLDivElement>;
}

export default function BotImageMessage({ link, chatRef }: IBotImageMessage) {
  const [isValidImage, setIsValidImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const saveFile = (fileString: string) => {
    const id = Date.now().toString();
    saveAs(fileString, `Image(${id.substring(id.length - 4)}).png`);
  };

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
              className="mt-3 text-white/70"
              onClick={() => saveFile(link)}
            >
              Download Image
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
