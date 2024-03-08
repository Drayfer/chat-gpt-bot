import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { UserSession } from "../../ai/route";
import { getBase64Image } from "@/app/helpers";

interface IParams {
  params: {
    id: String;
  };
}


export async function GET(request: Request, { params }: IParams) {
  const {
    user: { email },
  } = (await getServerSession(authOptions)) as UserSession;
  const { id } = params;
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    const messages = await client.chat.findMany({
      where: {
        userId: user?.id,
        session: Number(id),
      },
      select: {
        message: true,
        answer: true,
        session: true,
        createdAt: true,
        model: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const messagesArr = await Promise.all(
      messages.map(async (item) =>
        item.model === 1
          ? item.answer?.startsWith("https")
            ? { ...item, answer: item.answer }
            : { ...item, answer: await getBase64Image(item.answer as string) }
          : item
      )
    );
    return NextResponse.json(messagesArr, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
