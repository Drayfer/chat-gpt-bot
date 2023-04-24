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

export default function Upgrade() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isPaid, paidTo } = useIsPaid();
  const t = useTranslations("upgrade");

  const handleUpgrade = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    window.open("https://donate.stream/yoomoney410011297881154", "_blank");
  };

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4 min-h-screen flex flex-col justify-between">
      <div className="mb-10 text-xl">
        <Link href="/" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("upgrade")}
      </div>
      <div>
        <h1 className="text-3xl mb-6 font-bold text-center">{t("p1")}</h1>
        {isPaid && (
          <div className="flex justify-center items-center mb-5 text-lg">
            <CrownOutlined
              className="text-[#FFBA00] mr-2"
              style={{ fontSize: 18 }}
            />
            {t("p2")}:{" "}
            <span className="ml-2 font-bold">
              {moment(paidTo).format("DD.MM.YYYY")}
            </span>
          </div>
        )}
        {isPaid && (
          <div className="flex justify-center items-center mb-5 text-lg">
            {t("p18")}:{" "}
            <Link
              className="font-bold underline ml-1"
              href="http://ai-gpt.icu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://ai-gpt.icu/
            </Link>
          </div>
        )}

        <div className="md:flex md:flex-row md:space-x-4 bg-[#202123] lg:mx-40">
          <div className="p-4 md:w-1/2">
            <div className="text-xl font-bold flex justify-between">
              <div>{isPaid ? "Your Current Plan" : "Pro Plan"}</div>
              <div className="text-slate-400">10$/{t("p3")}</div>
            </div>
            <Link
              href={"/pay"}
              className="bg-green-600 hover:bg-green-600/90 w-full mt-4 text-white border-0 font-bold p-2 flex justify-center items-center mb-3 rounded-md"
            >
              {isPaid ? t("p4") : t("p5")}
            </Link>
            <div className="flex items-start">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              <div>{t("p6")}:</div>
              <div className="font-extrabold ml-2">
                <div>gpt-3.5-turbo ({t("p7")}),</div>
                {/* <div>gpt-4 (in future),</div> */}
                <div>Midjourney ({t("p8")})</div>
              </div>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              {t("p9")}: <span className="font-extrabold ml-2">{t("p10")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              {t("p11")}:{" "}
              <span className="font-extrabold ml-2">{t("p10")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              {t("p12")}:{" "}
              <span className="font-extrabold ml-2">{t("p10")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              {t("p13")}:{" "}
              <span className="font-extrabold ml-2">{t("p10")}</span>
            </div>
          </div>
          <div className="px-4 md:hidden">
            <Divider
              className="my-0 w-5/6"
              style={{
                borderBlockStart: "1px solid rgba(214, 214, 214, 0.493)",
              }}
            />
          </div>
          <div className="p-4 md:w-1/2 order-first">
            <div className="text-xl font-bold flex justify-between">
              <div>{t("p14")}</div>
            </div>
            <Button className="bg-slate-600 hover:bg-slate-600 w-full mt-4 text-white/50 border-0 font-bold p-5 flex justify-center items-center mb-3">
              {isPaid ? t("p15") : t("p16")}
            </Button>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-white/50 pr-2" />
              {t("p6")}:{" "}
              <span className="font-extrabold ml-2">gpt-3.5-turbo</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-white/50 pr-2" />
              {t("p9")}: <span className="font-extrabold ml-2">{t("p17")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-white/50 pr-2" />
              {t("p11")}:{" "}
              <span className="font-extrabold ml-2">{t("p17")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-white/50 pr-2" />
              {t("p12")}:{" "}
              <span className="font-extrabold ml-2">{t("p17")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-white/50 pr-2" />
              {t("p13")}:{" "}
              <span className="font-extrabold ml-2">{t("p17")}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
