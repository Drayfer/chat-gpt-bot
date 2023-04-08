"use client";
import { CheckCircleOutlined, CrownOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "../login/Footer";
import useIsPaid from "@/hooks/useIsPaid";
import moment from "moment";

export default function Upgrade() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isPaid, paidTo } = useIsPaid();

  const handleUpgrade = () => {
    if (!session) {
      router.push("/login");
    }
    axios("/api/upgrade");
  };

  return (
    <div className="text-[#D1D5DA] container mx-auto pt-10 px-4 min-h-screen flex flex-col justify-between">
      <div className="mb-10 text-xl">
        <Link href="/" className="font-extrabold underline">
          Back
        </Link>{" "}
        / Upgrade to Pro
      </div>
      <div>
        <h1 className="text-3xl mb-6 font-bold text-center">Account info</h1>
        {isPaid && (
          <div className="flex justify-center items-center mb-5 text-lg">
            <CrownOutlined
              className="text-[#FFBA00] mr-2"
              style={{ fontSize: 18 }}
            />
            PRO plan paid up to:{" "}
            <span className="ml-2 font-bold">
              {moment(paidTo).format("DD.MM.YYYY")}
            </span>
          </div>
        )}
        <div className="md:flex md:flex-row md:space-x-4 bg-[#202123] lg:mx-40">
          <div className="p-4 md:w-1/2">
            <div className="text-xl font-bold flex justify-between">
              <div>{isPaid ? "Your Current Plan" : "Pro Plan"}</div>
              <div className="text-slate-400">10$/month</div>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-600/90 w-full mt-4 text-white border-0 font-bold p-5 flex justify-center items-center mb-3"
              onClick={handleUpgrade}
            >
              {isPaid ? "Add 1 Month" : "Upgrade Plan"}
            </Button>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              Some text
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              Some text
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              Some text
            </div>
            <div className="flex items-center">
              <CheckCircleOutlined className="text-green-500 pr-2" />
              Some text
            </div>
          </div>

          {!isPaid && (
            <>
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
                  <div>Free Plan</div>
                </div>
                <Button className="bg-slate-600 hover:bg-slate-600 w-full mt-4 text-white/50 border-0 font-bold p-5 flex justify-center items-center mb-3">
                  Your Current Plan
                </Button>
                <div className="flex items-center">
                  <CheckCircleOutlined className="text-white/50 pr-2" />
                  Some text
                </div>
                <div className="flex items-center">
                  <CheckCircleOutlined className="text-white/50 pr-2" />
                  Some text
                </div>
                <div className="flex items-center">
                  <CheckCircleOutlined className="text-white/50 pr-2" />
                  Some text
                </div>
                <div className="flex items-center">
                  <CheckCircleOutlined className="text-white/50 pr-2" />
                  Some text
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
