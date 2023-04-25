"use client";

import Link from "@/components/Link";
import { CrownOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

export default function NoWebAccess() {
  const t = useTranslations("app");
  return (
    <>
      <div className="text-2xl flex justify-center items-center flex-col h-full text-white/70 text-center px-4">
        <div>{t("noWebAccess")}</div>
        <Link
          className="flex justify-start items-center border-0 text-white gap-3 mt-4 px-4 py-1 hover:text-white/70"
          href={"/upgrade"}
        >
          <CrownOutlined
            className="text-[#FFBA00]"
            style={{ fontSize: 18, paddingLeft: 5 }}
          />
          {t("upgrade")}
        </Link>
      </div>
    </>
  );
}
