"use client";

import Send from "@/app/svg/send";
import { Button, Divider, Drawer, Input, Space } from "antd";
import { TextAreaProps } from "antd/es/input";
const { TextArea } = Input;
import classnames from "classnames";
import {
  MenuOutlined,
  LeftCircleOutlined,
  CloseOutlined,
  PlusOutlined,
  CommentOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LogoutSvg from "@/app/svg/logoutSvg";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchDialogHistory } from "@/store/requests/chat";
import { resetDialog } from "@/store/chatSlice";

interface IMenu {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

interface IHistory {
  id: number;
  title: string;
  session: number;
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
  const { currentSession, dialog } = useAppSelector((state) => ({
    currentSession: state.chat.session,
    dialog: state.chat.dialog,
  }));
  const [history, setHistory] = useState<IHistory[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpenMenu) {
      getHistory().then((data) => setHistory(data));
    }
  }, [isOpenMenu]);

  const handleChooseTitle = async (item: IHistory) => {
    dispatch(fetchDialogHistory(item.session));
    setIsOpenMenu(false);
  };

  const handleDeleteDialog = async (sessionId: number) => {
    if (dialog.length && dialog[0].session === currentSession) {
      handleNewChat();
    }
    try {
      await deleteHistoryDialog(sessionId);
      setHistory(history.filter((item) => item.session !== sessionId));
    } catch (err) {}
  };

  const handleNewChat = () => {
    dispatch(resetDialog());
    setIsOpenMenu(false);
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
          <div className="">
            <Divider
              className="my-3"
              style={{
                borderBlockStart: "1px solid rgba(214, 214, 214, 0.493)",
              }}
            />
            <Button
              className="flex justify-start items-center border-0 text-white gap-1 mb-2"
              onClick={() =>
                (window.location.href = "https://t.me/chat_gpt_application")
              }
            >
              <QuestionCircleOutlined
                style={{ fontSize: 18, paddingLeft: 5 }}
              />
              Developer's Page
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
                  className="truncate pr-3 hover:last:text-red-600 w-full"
                  onClick={() => handleChooseTitle(item)}
                >
                  <CommentOutlined className="mr-3 text-white/50" />
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
