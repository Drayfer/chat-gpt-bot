// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { Cors } from "@/lib/cors";
import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface Question {
  question: string;
  chatSession: number;
}

interface UserSession {
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
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: body.question,
      temperature: 0.5,
      max_tokens: 800,
    });

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
    return NextResponse.json(
      { answer: response.data.choices[0].text },
      { status: 200 }
    );
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
