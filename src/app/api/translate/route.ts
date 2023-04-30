import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSession } from "../ai/route";
import { Configuration, OpenAIApi } from "openai";

interface IBody {
  text: string;
}

export async function POST(request: Request) {
  const body: IBody = await request.json();
  try {
    const {
      user: { email },
    } = (await getServerSession(authOptions)) as UserSession;
    const keyData = await client.settings.findFirst({
      where: {
        openaiKey: {
          not: "",
        },
      },
    });
    const configuration = new Configuration({
      apiKey: keyData?.openaiKeyPaid,
    });
    const openai = new OpenAIApi(configuration);
    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `translate to english text "${body.text}", result in JSON format like {en: "text"}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });
    if (!data.choices[0].message?.content) {
      throw new Error("no answer");
    }

    const answer = JSON.parse(data.choices[0].message?.content);
    if (
      answer instanceof Object &&
      "en" in answer &&
      typeof answer.en === "string"
    ) {
      return NextResponse.json(answer, {
        status: 200,
      });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
