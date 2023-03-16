import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { UserSession } from "../../ai/route";

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
    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
