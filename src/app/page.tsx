"use client";

import { useEffect, useRef, useState } from "react";
import { Comment } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import AiSvg from "./svg/ai";
import { redirect } from "next/navigation";
import InputQuestion from "@/components/input/InputQuestion";
import EmptyDialog from "./EmptyDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getChatSession } from "@/store/requests/chat";
import { resetDialog, setModel, updateChatSession } from "@/store/chatSlice";
import ImageStartDialog from "./ImageStartDialog";
import { saveAs } from "file-saver";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EmptyImage from "./images/empty-image.png";
import {
  addMessage,
  clearMessages,
  updateMessages,
} from "@/store/messagesSlice";
import NeedUpdate from "./NeedUpdate";

export interface Dialog {
  who: string;
  text: string;
}

const askAi = async (text: string, chatSession: number, model: number) => {
  return await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: text, chatSession, model }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.answer;
    });
};

const askImage = async (text: string, chatSession: number, model: number) => {
  return await fetch("/api/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: text, chatSession, model }),
  }).then((res) => res.json());
};

export default function Home() {
  const [input, setInput] = useState("");
  // const [dialog, setDialog] = useState<Dialog[]>([]);
  // const [isAnswer, setIsAnswer] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { historyDialog, chatSession, model, currentChat } = useAppSelector(
    (state) => ({
      historyDialog: state.chat.dialog,
      chatSession: state.chat.session,
      model: state.chat.model,
      currentChat: state.messages.currentChat,
    })
  );
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const handleSubmit = async () => {
    setImageError(false);
    const question = input;
    setInput("");
    setIsTyping(true);
    if (model === "gpt") {
      const modelType = 0;
      askAi(question, chatSession, modelType)
        .then((answer) => {
          dispatch(addMessage({ who: "bot", text: answer }));
        })
        .catch((err) => {
          dispatch(
            addMessage({
              who: "bot",
              text: "Something went wrong, please ask again",
            })
          );
          const lastMyMessage = currentChat
            .filter((obj) => obj.who === "me")
            .pop();
          if (lastMyMessage) {
            setInput(lastMyMessage.text);
          }
        })
        .finally(() => {
          setScroll(true);
          setIsTyping(false);
        });
    } else if (model === "image") {
      const modelType = 1;
      askImage(question, chatSession, modelType)
        .then((data) => {
          if (!data.answer) {
            throw new Error("error");
          }
          dispatch(addMessage({ who: "bot", text: data.answer }));
        })
        .catch((err) => {
          dispatch(addMessage({ who: "bot", text: "error" }));
          const lastMyMessage = currentChat
            .filter((obj) => obj.who === "me")
            .pop();
          if (lastMyMessage) {
            setInput(lastMyMessage.text);
          }
        })
        .finally(() => {
          setScroll(true);
          setIsTyping(false);
        });
    }
  };

  useEffect(() => {
    setImageError(false);
    if (historyDialog.length) {
      let history: Dialog[] = [];
      historyDialog.forEach((item) => {
        history.push(
          { who: "me", text: item.message },
          { who: "bot", text: item.answer }
        );
      });
      dispatch(updateMessages(history));
      dispatch(updateChatSession(historyDialog[0].session));
      setTimeout(scrollToBottom, 100);
    } else {
      dispatch(clearMessages());
      dispatch(getChatSession());
    }
    //eslint-disable-next-line
  }, [historyDialog]);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (scroll || isTyping) {
      scrollToBottom();
      setScroll(false);
    }
  }, [scroll, isTyping]);

  useEffect(() => {
    dispatch(getChatSession());
    //eslint-disable-next-line
  }, []);

  if (!session) {
    redirect("/login");
  }

  const handleSendQuestion = () => {
    if (input.trim().length && !isTyping) {
      dispatch(addMessage({ who: "me", text: input }));
      setScroll(true);
      handleSubmit();
    }
  };

  const saveFile = (fileString: string) => {
    const id = Date.now().toString();
    saveAs(fileString, `Image(${id.substring(id.length - 4)}).png`);
  };

  const handleNewChat = () => {
    dispatch(resetDialog());
    dispatch(setModel("gpt"));
  };
  if (process.env.NEED_UPDATE === "true") {
    return <NeedUpdate />;
  }
  return (
    <main className="h-screen text-[#D1D5DA] flex flex-col">
      {currentChat.length ? (
        <div className="p-2 py-0 border-2 border-white/20 text-white/50 text-xs flex justify-between items-center">
          <div>
            <span className="font-light">Chat Model:</span>{" "}
            <span className="font-bold">
              {model === "image" ? "Midjourney" : "gpt-3.5-turbo"}
            </span>
          </div>
          <Button
            className="p-2 m-0 h-100 text-white border-0 flex justify-center items-center hover:bg-white/10"
            onClick={handleNewChat}
          >
            <PlusOutlined className="text-xs" />
          </Button>
        </div>
      ) : null}
      <div className="flex-1 flex-col pt-3 overflow-y-auto pb-0 px-3" ref={ref}>
        {/* {!currentChat.length && model === gpt && <SelectModel />} */}
        {model === "gpt" && !currentChat.length && <EmptyDialog />}
        {model === "image" && !currentChat.length && <ImageStartDialog />}
        {currentChat.map((item, i) => {
          if (item.who === "me") {
            return (
              <div key={i}>
                <div className="bg-slate-500 w-11/12 ml-auto p-3 rounded-md flex justify-between mb-4 overflow-hidden chat">
                  <div className="whitespace-pre-wrap flex-1 overflow-hidden break-words mr-2">
                    {item.text}
                  </div>
                  <div className="flex justify-center items-start h-14 w-14">
                    {session.user?.image && (
                      <NextImage
                        src={session.user?.image}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i}>
                <div className="bg-gray-600 w-11/12 mr-auto p-3 rounded-md flex mb-4">
                  <div className="flex justify-center items-start text-slate-100 mr-5">
                    <AiSvg />
                  </div>
                  <div className="whitespace-pre-wrap flex-1 overflow-hidden break-words">
                    {model === "image" ? (
                      <>
                        {item.text === "error" || !item.text.length ? (
                          "Something went wrong, please ask again"
                        ) : (
                          <div className="flex flex-col items-center">
                            {!imageError ? (
                              <>
                                <NextImage
                                  src={item.text}
                                  width={1000}
                                  height={1000}
                                  alt="generated_image"
                                  onError={() => setImageError(true)}
                                />
                                <Button
                                  className="mt-3 text-white/70"
                                  onClick={() => saveFile(item.text)}
                                >
                                  Download Image
                                </Button>
                              </>
                            ) : (
                              <NextImage
                                src={EmptyImage}
                                width={200}
                                height={200}
                                alt="not available"
                              />
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      item.text
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
        {isTyping && (
          <div className="bg-gray-600 p-3 rounded-md mb-4 inline-flex items-center">
            <Comment
              visible={true}
              height="20"
              width="20"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#fff"
              backgroundColor="#0BA37F"
            />
            <div className="ml-3">
              {model === "image" ? "generate" : "typing"}...
            </div>
          </div>
        )}
      </div>
      <div className="min-h-[70px] p-3 pb-4">
        <InputQuestion
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault();
              handleSendQuestion();
            }
          }}
          onSendQuestion={handleSendQuestion}
        />
      </div>
    </main>
  );
}
