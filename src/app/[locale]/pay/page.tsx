"use client";
import { CheckCircleOutlined, CrownOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "../login/Footer";
import useIsPaid from "@/hooks/useIsPaid";
import moment from "moment";
import Link from "@/components/Link";
import { useTranslations } from "next-intl";

export default function Pay() {
  const t = useTranslations("upgrade");

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4 min-h-screen flex flex-col justify-between">
      <div className="mb-10 text-xl">
        <Link href="/upgrade" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("upgrade")}
      </div>
      <div>
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
          <Link
            href="https://donatello.to/ai-gpt"
            className="block bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donatello
          </Link>
        </div>
        <div className="mt-8 text-sm text-center">* {t("payMessage")}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
