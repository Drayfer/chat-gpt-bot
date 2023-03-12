import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
interface Question {
  question: string;
  chatSession: number;
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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: body.question }],
        temperature: 0.8,
        max_tokens: 1000,
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
  if (chat?.chat.length) {
    const chatSession = chat?.chat[0]?.session;
    return NextResponse.json({ chatSession: chatSession + 1 }, { status: 200 });
  }
  return NextResponse.json({ chatSession: 0 }, { status: 200 });
}
