"use client";

import Send from "@/app/[locale]/svg/send";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
const { TextArea } = Input;
import classnames from "classnames";
import { MenuOutlined, LeftCircleOutlined } from "@ant-design/icons";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import Menu from "../menu/Menu";
import { useAppDispatch } from "@/hooks/redux";
import { clearMessages, setModel } from "@/store/chatSlice";
import { getChatSession } from "@/store/requests/chat";
import useIsDesktop from "@/hooks/useIsDesktop";
import { useTranslations } from "next-intl";
import TranslateSvg from "./TranslateSvg";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

interface IInputQuestion extends TextAreaProps {
  onSendQuestion: () => void;
  setInput: Dispatch<SetStateAction<string>>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

interface ITranslate {
  en: string;
}

const InputQuestion = (props: IInputQuestion) => {
  const { onSendQuestion, value, setInput, ...params } = props;
  const [activeField, setActiveField] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [showTranslate, setShowTranslate] = useState(true);
  const [isLoadingTranslate, setIsLoadingTranslate] = useState(false);

  const t = useTranslations("app");

  const dispatch = useAppDispatch();
  const { isDesktop } = useIsDesktop();
  const isValue =
    activeField ||
    (value?.toString() && value?.toString().length > 0 ? true : false);

  const handleTranslate = async () => {
    if (!value?.toString().trim().length) {
      return;
    }
    try {
      setIsLoadingTranslate(true);
      const { data } = await axios.post<ITranslate>(
        "/api/translate",
        {
          text: value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInput(data.en);
    } catch (err) {
    } finally {
      setShowTranslate(false);
      setIsLoadingTranslate(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setShowTranslate(true);
    props.onChange(e);
  };

  return (
    <>
      {!isDesktop && (
        <Menu setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
      )}

      <div className="relative">
        {!!value?.toString().trim().length && showTranslate && (
          <button
            disabled={isLoadingTranslate}
            className="bg-[#518CF2] rounded-full overflow-hidden w-[35px] absolute left-0 top-[-50px] opacity-40 cursor-pointer"
            onClick={handleTranslate}
          >
            <div className="relative w-full h-full">
              {isLoadingTranslate && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="opacity-50">
                    <ThreeCircles
                      height="40"
                      width="40"
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="three-circles-rotating"
                      outerCircleColor=""
                      innerCircleColor=""
                      middleCircleColor=""
                    />
                  </div>
                </div>
              )}
              <TranslateSvg />
            </div>
          </button>
        )}

        <TextArea
          {...params}
          value={value}
          onChange={handleChange}
          placeholder={`${t("something")}...`}
          autoSize={{ minRows: 1, maxRows: 6 }}
          className={classnames(
            "w-full rounded-sm m-0 border-0 text-lg bg-slate-500 pr-10 py-2 text-[#D1D5DA] placeholder:text-slate-400",
            {
              "pl-2 pr-8": isValue,
              "pl-10": !isDesktop,
            }
          )}
          style={{ resize: "none" }}
          onFocus={() => setActiveField(true)}
          onBlur={() => setActiveField(false)}
        />
        {!isValue && !isDesktop ? (
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
