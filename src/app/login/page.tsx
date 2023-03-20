"use client";

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GoogleSvg from "./svg/googleSvg";
import AiSvg from "../svg/ai";
import Link from "next/link";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-start text-[#D1D5DA] flex-col pt-40 container mx-auto px-4">
      <div className="flex justify-start items-center flex-col">
        <AiSvg />
        <div className="text-3xl mb-14 mt-2">Chat GPT</div>
        <button
          className="bg-[#4C82E5] p-3 text-lg rounded-sm flex items-center"
          onClick={(e) => {
            e.preventDefault();
            signIn("google");
          }}
        >
          <div className="bg-white h-9 w-9 mr-3">
            <GoogleSvg />
          </div>
          <span>Sign in with Google</span>
        </button>
      </div>
      <div className="text-justify mt-40 text-sm">
        <p className="mb-6">
          Welcome to Chat GPT, your personal AI-powered virtual assistant that
          can make your life easier and more efficient. Powered by OpenAI&apos;s
          advanced language model, GPT-3.5, Chat GPT offers a chatbot service
          that can help you with a wide range of tasks and inquiries.
        </p>

        <p className="mb-6">
          Our chatbot technology uses natural language processing to provide a
          human-like experience that can handle various requests, from simple
          queries to complex requests. You can rely on Chat GPT to provide
          accurate and efficient responses that can save you time and effort.
        </p>

        <p className="mb-6">
          One of the best things about Chat GPT is its ability to learn and
          adapt to your needs over time. As you interact with our chatbot, it
          will gradually develop a better understanding of your preferences,
          needs, and communication style. This allows Chat GPT to provide
          personalized and accurate responses, making it an ideal solution for
          individuals, businesses, and organizations of all sizes.
        </p>

        <p className="mb-6">
          Whether you need help with customer support, sales, marketing, or any
          other aspect of your business, Chat GPT is here to assist you. Our
          chatbot is available 24/7 and can be accessed through your favorite
          messaging platform or web browser. You can count on Chat GPT to
          provide fast, reliable, and personalized support whenever you need it,
          wherever you are.
        </p>

        <p className="mb-6">
          In addition to its powerful AI technology, Chat GPT offers a variety
          of features to enhance your online communication experience. You can
          use our chatbot to conduct research, receive news updates, book
          appointments, and more, all without ever leaving your messaging
          platform or web browser. This means that you can save time and
          streamline your daily routine, all while enjoying an improved online
          communication experience.
        </p>

        <p className="mb-6">
          At Chat GPT, we are committed to providing the highest level of
          service to our users. Our chatbot is continuously updated to ensure
          that it offers the latest and most accurate information, making it an
          indispensable tool for anyone seeking personalized assistance.
        </p>

        <p className="mb-6">
          In conclusion, Chat GPT offers a chatbot service that can improve your
          online communication experience and help you achieve your goals more
          efficiently. With its advanced AI technology and personalized
          approach, Chat GPT is the ideal virtual assistant for anyone looking
          to simplify their life and save time. So why wait? Sign up for Chat
          GPT today and start enjoying the benefits of the most advanced
          language model in the world.
        </p>
      </div>
      <Divider
        className="my-3"
        style={{
          borderBlockStart: "1px solid rgba(214, 214, 214, 0.493)",
        }}
      />
      <div className="flex justify-between">
        <Button
          className="flex justify-start items-center border-0 text-white gap-1 mb-2 bg-transparent"
          href="https://t.me/chat_gpt_application"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developer&apos;s Page
        </Button>
        <Link
          className="px-[15px] py-1 flex justify-start items-center border-0 text-white gap-1 mb-2 bg-transparent"
          href="/privacy"
        >
          Privacy
        </Link>
      </div>
    </div>
  );
}
