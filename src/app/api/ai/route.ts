import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export interface Question {
  question: string;
  chatSession: number;
  model: number;
  isPaid?: boolean;
}

interface GPTDialog {
  role: "user" | "assistant" | "system";
  content: string | null;
}

export interface UserSession {
  user: {
    email: string;
  };
}

export async function POST(request: Request) {
  const {
    user: { email },
  } = (await getServerSession(authOptions)) as UserSession;
  const body: Question = await request.json();
  try {
    const keyData = await client.settings.findFirst({
      where: {
        openaiKey: {
          not: "",
        },
      },
    });

    let context: GPTDialog[] = [];
    if (body.isPaid) {
      const user = await client.user.findUnique({
        where: {
          email,
        },
      });
      const messages = await client.chat.findMany({
        where: {
          userId: user?.id,
          session: body.chatSession,
        },
        take: 3,
        select: {
          message: true,
          answer: true,
          session: true,
          createdAt: true,
          model: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const dialog: GPTDialog[] = [];
      messages.forEach((item) => {
        dialog.unshift({ role: "assistant", content: item.answer });
        dialog.unshift({ role: "user", content: item.message });
      });
      context = [...dialog];
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          body.isPaid ? keyData?.openaiKeyPaid : keyData?.openaiKey
        }`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...context, { role: "user", content: body.question }],
        temperature: 0.8,
        max_tokens: 700,
      }),
    });
    const data = await response.json();
    const answerString: string =
      data.choices[0].message.content.trim() as string;
    const user = await client.user.findUnique({
      where: { email },
    });
    await client.chat.create({
      data: {
        message: body.question,
        session: body.chatSession,
        userId: user?.id,
        answer: answerString,
        model: body.model,
      },
    });
    return NextResponse.json({ answer: answerString }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

export async function GET(request: Request) {
  const {
    user: { email },
  } = (await getServerSession(authOptions)) as UserSession;

  const chat = await client.user.findUnique({
    where: { email },
    select: {
      chat: {
        orderBy: {
          session: "desc",
        },
        take: 1,
        select: {
          session: true,
        },
      },
    },
  });
  await client.user.update({
    where: { email },
    data: { updatedDate: new Date() },
  });
  if (chat?.chat.length) {
    const chatSession = chat?.chat[0]?.session;
    return NextResponse.json({ chatSession: chatSession + 1 }, { status: 200 });
  }
  return NextResponse.json({ chatSession: 0 }, { status: 200 });
}
