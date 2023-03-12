import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { UserSession } from "../ai/route";

interface IFiltered {
  [key: string]: {
    id: number;
    message: string | null;
  };
}

export async function GET(request: Request) {
  const {
    user: { email },
  } = (await getServerSession(authOptions)) as UserSession;
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    const messages = await client.chat.findMany({
      where: {
        userId: user?.id,
        answer: {
          not: "",
        },
        deteted: false,
      },
      select: {
        message: true,
        session: true,
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    let filtered: IFiltered = {};
    messages.forEach((item) => {
      filtered[`${item.session.toString()}`] = {
        id: item.id,
        message: item.message,
      };
    });
    const reversed = Object.values(filtered).map((item) => {
      return {
        id: item.id,
        title: item.message,
        session: messages.find((elem) => elem.id === item.id)?.session,
      };
    });

    return NextResponse.json(reversed.reverse(), { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
