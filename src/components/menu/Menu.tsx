"use client";

import { Button, Divider, Drawer, Space } from "antd";
import classnames from "classnames";
import {
  CloseOutlined,
  PlusOutlined,
  CommentOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  FileImageOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LogoutSvg from "@/app/svg/logoutSvg";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchDialogHistory, getChatSession } from "@/store/requests/chat";
import { clearMessages, setModel } from "@/store/chatSlice";
import Link from "next/link";
import useIsPaid from "@/hooks/useIsPaid";
import { useRouter } from "next/navigation";

interface IMenu {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

interface IHistory {
  id: number;
  title: string;
  session: number;
  model: number;
}

const getHistory = async () => {
  return await fetch("/api/history")
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

const deleteHistoryDialog = async (sessionId: number) => {
  try {
    await fetch(`/api/history/delete/${sessionId}`);
    return;
  } catch (err) {}
};

const Menu = ({ isOpenMenu, setIsOpenMenu }: IMenu) => {
  const { currentSession, currentChat } = useAppSelector((state) => ({
    currentSession: state.chat.session,
    currentChat: state.chat.currentChat,
  }));
  const [history, setHistory] = useState<IHistory[]>([]);
  const { isPaid } = useIsPaid();
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpenMenu) {
      getHistory().then((data) => setHistory(data));
    }
  }, [isOpenMenu]);

  const handleChooseTitle = async (item: IHistory) => {
    if (item.model === 1 && !isPaid) {
      router.push("/upgrade");
      return;
    }
    dispatch(fetchDialogHistory(item.session));
    setIsOpenMenu(false);
  };

  const handleNewChat = () => {
    setIsOpenMenu(false);
    dispatch(setModel("startGpt"));
    dispatch(clearMessages());
    dispatch(getChatSession());
  };

  const handleDeleteDialog = async (sessionId: number) => {
    if (currentChat.length && sessionId === currentSession) {
      handleNewChat();
    }
    try {
      await deleteHistoryDialog(sessionId);
      setHistory(history.filter((item) => item.session !== sessionId));
    } catch (err) {}
  };

  return (
    <>
      <Drawer
        title={
          <Button
            className="text-white w-5/6 flex justify-center items-center hover:bg-white/10"
            onClick={handleNewChat}
          >
            <PlusOutlined />
            New Chat
          </Button>
        }
        placement={"left"}
        closable={false}
        onClose={() => setIsOpenMenu(false)}
        open={isOpenMenu}
        key={"left"}
        closeIcon={<CloseOutlined style={{ fontSize: 18 }} />}
        className="bg-slate-300 text-slate-50"
        style={{ backgroundColor: "#373839" }}
        headerStyle={{ color: "#ff0000" }}
        bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
        footer={
          <div>
            <Divider
              className="my-3"
              style={{
                borderBlockStart: "1px solid rgba(214, 214, 214, 0.493)",
              }}
            />
            <Link
              className="flex justify-start items-center border-0 text-white gap-3 mb-2 px-4 py-1 hover:text-white/70"
              href={"/upgrade"}
            >
              <CrownOutlined
                className="text-[#FFBA00]"
                style={{ fontSize: 18, paddingLeft: 5 }}
              />
              {isPaid ? "PRO" : "Upgrade to Pro"}
            </Link>
            <Button
              className="flex justify-start items-center border-0 text-white gap-1 mb-2 bg-transparent"
              href="https://t.me/chat_gpt_application"
              target="_blank"
              rel="noopener noreferrer"
            >
              <QuestionCircleOutlined
                style={{ fontSize: 18, paddingLeft: 5 }}
              />
              Developer&apos;s Page
            </Button>
            <Button
              className="flex justify-start border-0 text-white gap-2"
              onClick={() => signOut()}
            >
              <span className="pr-1">
                <LogoutSvg />
              </span>{" "}
              Log out
            </Button>
          </div>
        }
        extra={
          <Space>
            <Button
              className="p-2 flex justify-center items-center border-0 text-white"
              onClick={() => setIsOpenMenu(false)}
            >
              <CloseOutlined style={{ fontSize: 18 }} />
            </Button>
          </Space>
        }
      >
        <div className="overflow-y-auto">
          {history.map((item) => {
            return (
              <div
                key={item.id}
                className={classnames(
                  "flex items-center justify-between py-2 mb-2 hover:cursor-pointer text-lg hover:bg-white/10 px-3",
                  {
                    "bg-white/10": item.session === currentSession,
                  }
                )}
              >
                <div
                  className={`truncate pr-3 hover:last:text-red-600 w-full flex items-center ${
                    !isPaid && item.model === 1 ? "text-white/50" : ""
                  }`}
                  onClick={() => handleChooseTitle(item)}
                >
                  {item.model === 0 ? (
                    <CommentOutlined className="mr-3 text-white/50" />
                  ) : !isPaid && item.model === 1 ? (
                    <CrownOutlined
                      className="text-[#FFBA00] mr-3"
                      style={{ fontSize: 18 }}
                    />
                  ) : (
                    <FileImageOutlined className="mr-3 text-white/50" />
                  )}
                  {item.title}
                </div>
                <Button
                  className="flex justify-center items-center text-white/70 p-2 border-0"
                  onClick={() => handleDeleteDialog(item.session)}
                >
                  <DeleteOutlined style={{ fontSize: 18 }} />
                </Button>
              </div>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};

export default Menu;
