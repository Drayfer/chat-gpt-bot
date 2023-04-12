"use client";

import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import Footer from "../login/Footer";

export default function Login() {
  const t = useTranslations("agreement");

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4">
      <div className="mb-10 text-xl">
        <Link href="/" className="font-extrabold underline">
          {t("back")}
        </Link>{" "}
        / {t("agreement")}
      </div>
      <h1 className="text-3xl mb-6 font-bold">{t("p1")}</h1>

      <p className="mb-6">{t("p2")}</p>

      <h2 className="text-2xl mb-6 font-bold">1. {t("p3")}</h2>
      <p className="mb-6">1.1. {t("p4")}</p>

      <h2 className="text-2xl mb-6 font-bold">2. {t("p4i1")}</h2>
      <p className="mb-6">2.1. {t("p5")}</p>
      <p className="mb-6">2.2. {t("p6")}</p>
      <p className="mb-6">2.3. {t("p7")}</p>

      <h2 className="text-2xl mb-6 font-bold">3. {t("p8")}</h2>
      <p className="mb-6">3.1. {t("p9")}</p>
      <p className="mb-6">3.2. {t("p10")}</p>
      <p className="mb-6">3.3. {t("p11")}</p>
      <p className="mb-6">3.4. {t("p12")}</p>
      <p className="mb-6">3.5. {t("p13")}</p>

      <h2 className="text-2xl mb-6 font-bold">4. {t("p14")}s</h2>
      <p className="mb-6">4.1. {t("p15")}</p>
      <p className="mb-6">4.2. {t("p16")}</p>

      <h2 className="text-2xl mb-6 font-bold">5. {t("p16i1")}</h2>
      <p className="mb-6">5.1. {t("p17")}</p>
      <p className="mb-6">5.2. {t("p18")}</p>
      <p className="mb-6">5.3. {t("p19")}</p>

      <h2 className="text-2xl mb-6 font-bold">6. {t("p20")}</h2>
      <p className="mb-6">6.1. {t("p21")}</p>
      <p className="mb-6">6.2. {t("p22")}</p>

      <h2 className="text-2xl mb-6 font-bold">7. {t("p23")}</h2>
      <p className="mb-6">7.1. {t("p24")}</p>
      <p className="mb-6">7.2. {t("p25")}</p>

      <h2 className="text-2xl mb-6 font-bold">8. {t("p26")}</h2>
      <p className="mb-6">8.1. {t("p27")}</p>
      <p className="mb-6">8.2. {t("p28")}</p>
      <p className="mb-6">8.3. {t("p29")}</p>
      <Footer />
    </div>
  );
}
