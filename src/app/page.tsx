"use client";

import { useEffect, useRef, useState } from "react";
import { Comment } from "react-loader-spinner";
import { useSession, signOut } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";
import Send from "./svg/send";
import Image from "next/image";
import AiSvg from "./svg/ai";
import LogoutSvg from "./svg/logoutSvg";
import { redirect } from "next/navigation";

interface Dialog {
  who: string;
  text: string;
}

const askAi = async (text: string, chatSession: number) => {
  return await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: text, chatSession }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.answer;
    });
};

export default function Home() {
  const [input, setInput] = useState("");
  const [dialog, setDialog] = useState<Dialog[]>([]);
  const [isAnswer, setIsAnswer] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const handleSubmit = async () => {
    const question = input;
    setInput("");
    setIsTyping(true);
    askAi(question, chatSession)
      .then((answer) => {
        setDialog([...dialog, { who: "bot", text: answer }]);
      })
      .catch((err) => {
        setDialog([
          ...dialog,
          { who: "bot", text: "Something went wrong, please ask again" },
        ]);
        const lastMyMessage = dialog.filter((obj) => obj.who === "me").pop();
        if (lastMyMessage) {
          setInput(lastMyMessage.text);
        }
      })
      .finally(() => {
        setScroll(true);
        setIsTyping(false);
      });
  };

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const getChatSession = async () => {
    const { chatSession }: { chatSession: number } = await fetch(
      "/api/ai"
    ).then((res) => res.json());
    setChatSession(chatSession);
  };

  useEffect(() => {
    if (isAnswer) {
      handleSubmit();
      setIsAnswer(false);
    }
  }, [isAnswer]);

  useEffect(() => {
    if (scroll || isTyping) {
      scrollToBottom();
      setScroll(false);
    }
  }, [scroll, isTyping]);

  useEffect(() => {
    getChatSession();
  }, []);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="h-screen text-[#D1D5DA] flex flex-col">
      <div className="flex-1 flex-col pt-5 overflow-y-auto pb-5 px-5" ref={ref}>
        {!dialog.length && (
          <>
            <div className="text-3xl flex justify-center items-center flex-col h-full">
              <p>Chat GPT</p>
              <p className="text-base mt-2">
                Ask anything to start a conversation...
              </p>
            </div>
          </>
        )}
        {dialog.map((item, i) => {
          if (item.who === "me") {
            return (
              <>
                <div
                  key={i + Date.now()}
                  className="bg-slate-500 w-10/12 ml-auto p-3 rounded-md flex justify-between mb-4 chat"
                >
                  <div className="flex-1 mr-2">{item.text}</div>
                  <div className="flex justify-center items-start h-14 w-14">
                    {session.user?.image && (
                      <Image
                        src={session.user?.image}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    )}
                  </div>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div
                  key={i + Date.now()}
                  className="bg-gray-600 w-10/12 mr-auto p-3 rounded-md flex mb-4"
                >
                  <div className="flex justify-center items-start text-slate-100 mr-5">
                    <AiSvg />
                  </div>
                  <div className="whitespace-pre-line flex-1">
                    {item.text.trim()}
                  </div>
                </div>
              </>
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
            <div className="ml-3">typing...</div>
          </div>
        )}
      </div>
      <div className="min-h-[110px] p-2">
        <div className="relative md:mx-5">
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            value={input}
            placeholder="Ask something..."
            className="w-full rounded-sm m-0 border-0 text-lg bg-slate-500 pl-2 pr-8 py-2"
            style={{ resize: "none" }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                setDialog([...dialog, { who: "me", text: input }]);
                setIsAnswer(true);
                setScroll(true);
              }
            }}
          />
          <button
            className="p-2 absolute bg-transparent resize-none right-0 bottom-2"
            onClick={() => {
              setDialog([...dialog, { who: "me", text: input }]);
              setIsAnswer(true);
              setScroll(true);
            }}
          >
            <Send />
          </button>
        </div>
        <div className="mt-2 flex justify-between">
          <button className="p-3 rounded-lg" onClick={() => signOut()}>
            <LogoutSvg />
          </button>
          <button
            className="p-3 bg-slate-600 rounded-lg"
            disabled={!dialog.length}
            onClick={() => {
              setDialog([]);
              setChatSession((prev) => prev + 1);
            }}
          >
            Clear dialog
          </button>
          <div></div>
        </div>
      </div>
    </main>
  );
}
