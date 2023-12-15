"use client";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import Footer from "../login/Footer";
import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Pay() {
  const t = useTranslations("upgrade");
  const { data: session } = useSession();
  const router = useRouter();
  const [isSend, setIsSent] = useState(false);

  const handleSendEmail = async () => {
    const { data } = await axios("/api/sendemail");
    if (data.data === "ok") {
      setIsSent(true);
    }
  };
  const handlePayDiaka = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    await axios("/api/payment");
    window.open(
      `https://oleh-mykhailychenko.diaka.ua/donate?amount=370&name=${session?.user?.email}&message=donate`,
      "_blank"
    );
  };

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4 min-h-screen flex flex-col justify-between">
      <div className="mb-10 text-xl">
        <Link href="/upgrade" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("upgrade")}
      </div>
      <div className="text-center">
        <h1 className="text-3xl mb-6 font-bold text-center">{t("method")}</h1>
        <div className="w-[200px] mx-auto">
          <Link
            href="https://donate.stream/yoomoney410011297881154"
            className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center mb-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate.Stream
          </Link>
          <Button
            onClick={handlePayDiaka}
            className="bg-blue-500 hover:bg-blue-400 w-full text-white border-b-4 border-blue-700 hover:border-blue-500 font-bold p-2 py-5 flex justify-center items-center mb-3 rounded-md"
          >
            Diaka
          </Button>
        </div>
        <div className="mt-8 text-sm text-center">* {t("payMessage")}</div>
        <div className="mt-2 text-sm text-center">
          * {t("mes1")}{" "}
          <Link
            className="text-white font-bold"
            href="https://t.me/chat_gpt_application"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://t.me/chat_gpt_application
          </Link>{" "}
          {t("mes2")}
        </div>
        {session && !isSend ? (
          <Button
            onClick={handleSendEmail}
            className="flex justify-start items-center text-white gap-1 mb-2 bg-transparent mx-auto mt-3"
          >
            {t("send")}
          </Button>
        ) : (
          session && (
            <div
              className="inline-flex mx-auto items-center bg-slate-500 text-white text-sm font-bold px-4 py-3 mt-3 w-auto"
              role="alert"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
              </svg>
              <p>{t("info")}</p>
            </div>
          )
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
