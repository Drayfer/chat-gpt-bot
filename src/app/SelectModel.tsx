"use client";

import { useAppDispatch } from "@/hooks/redux";
import { setModel, TModel } from "@/store/chatSlice";

export default function SelectModel() {
  const dispatch = useAppDispatch();

  const handleModel = (modelType: TModel) => {
    dispatch(setModel(modelType));
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-full">
        <p className="text-4xl mb-3 font-bold">GPT AI Chat Bot</p>
        <p className="text-xl mb-3 font-extralight">Choose Model:</p>
        <div
          className="flex flex-col justify-center items-center bg-[#5d5d68] p-4 mb-4 cursor-pointer w-72"
          onClick={() => handleModel("gpt")}
        >
          <div className="text-lg font-bold mb-2">Open AI</div>
          <div className="text-sm font-light">
            Text chat with GPT AI Chat Bot assistent
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center bg-[#5d5d68] p-4 cursor-pointer w-72"
          onClick={() => handleModel("image")}
        >
          <div className="text-lg font-bold mb-2">
            Midjourney <span className="font-light">(Beta)</span>
          </div>
          <div className="text-sm font-light">Generate Images Model</div>
        </div>
      </div>
    </>
  );
}
