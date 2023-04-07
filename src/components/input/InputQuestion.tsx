"use client";

import Send from "@/app/svg/send";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
const { TextArea } = Input;
import classnames from "classnames";
import { MenuOutlined, LeftCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import Menu from "../menu/Menu";
import { useAppDispatch } from "@/hooks/redux";
import { clearMessages, setModel } from "@/store/chatSlice";
import { getChatSession } from "@/store/requests/chat";

interface IInputQuestion extends TextAreaProps {
  onSendQuestion: () => void;
}

const InputQuestion = (props: IInputQuestion) => {
  const { onSendQuestion, value, ...params } = props;
  const [activeField, setActiveField] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const dispatch = useAppDispatch();

  const isValue =
    activeField ||
    (value?.toString() && value?.toString().length > 0 ? true : false);

  return (
    <>
      <Menu setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
      <div className="relative">
        <TextArea
          {...params}
          value={value}
          placeholder="Ask something..."
          autoSize={{ minRows: 1, maxRows: 6 }}
          className={classnames(
            "w-full rounded-sm m-0 border-0 text-lg bg-slate-500 pl-10 pr-10 py-2 text-[#D1D5DA] placeholder:text-slate-400",
            {
              "pl-2 pr-8": isValue,
            }
          )}
          style={{ resize: "none" }}
          onFocus={() => setActiveField(true)}
          onBlur={() => setActiveField(false)}
        />
        {!isValue ? (
          <button
            className="px-3 absolute bg-transparent resize-none left-0 bottom-0 flex justify-center items-center h-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenMenu(!isOpenMenu);
            }}
          >
            <MenuOutlined style={{ fontSize: 20 }} />
          </button>
        ) : null}

        {isValue ? (
          <button
            className="p-2 absolute bg-transparent resize-none right-0 bottom-1"
            onClick={onSendQuestion}
          >
            <Send />
          </button>
        ) : (
          <button
            className="px-3 absolute bg-transparent resize-none right-0 bottom-0 flex justify-center items-center h-full"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setModel("startGpt"));
              dispatch(clearMessages());
              dispatch(getChatSession());
            }}
          >
            <LeftCircleOutlined style={{ fontSize: 20 }} />
          </button>
        )}
      </div>
    </>
  );
};

export default InputQuestion;
