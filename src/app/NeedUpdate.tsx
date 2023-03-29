"use client";
import Image from "next/image";
import Link from "next/link";
import PlayMarket from "./images/playMarket.webp";

export default function NeedUpdate() {
  return (
    <>
      <div className="text-2xl flex justify-center items-center flex-col h-full text-white/70 text-center px-4">
        To continue using the app, please update it
        <Link
          href="https://play.google.com/store/apps/details?id=com.gptaichat.bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="mt-4"
            src={PlayMarket}
            width={250}
            height={130}
            alt="update_app"
          />
        </Link>
      </div>
    </>
  );
}
