"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useIsPaid from "@/hooks/useIsPaid";
import { setModel, TModel } from "@/store/chatSlice";
import { CrownOutlined } from "@ant-design/icons";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function SelectModel() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isPaid } = useIsPaid();

  const handleModel = (modelType: TModel) => {
    if (modelType === "image" && !isPaid) {
      router.push("/upgrade");
      return;
    }
    dispatch(setModel(modelType));
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full">
        <p className="text-4xl mb-3 font-bold">GPT AI Chat Bot</p>
        <p className="text-xl mb-3 font-extralight">Choose Model:</p>
        <div
          className="flex flex-col justify-center items-center bg-slate-500 p-4 mb-4 cursor-pointer w-72"
          onClick={() => handleModel("gpt")}
        >
          <div className="text-lg font-bold mb-2">Open AI</div>
          <div className="text-sm font-light">
            Text chat with GPT AI Chat Bot assistent
          </div>
        </div>
        <div
          className={`flex flex-col justify-center items-center bg-slate-500 ${
            isPaid ? "opacity-100" : "opacity-60"
          } p-4 cursor-pointer w-72`}
          onClick={() => handleModel("image")}
        >
          <div className="text-lg font-bold mb-2 flex items-center">
            <CrownOutlined
              className="text-[#FFBA00] mr-2"
              style={{ fontSize: 18, paddingLeft: 5 }}
            />{" "}
            Midjourney
          </div>
          <div className="text-sm font-light">Generate Images Model</div>
        </div>
      </div>
    </>
  );
}
