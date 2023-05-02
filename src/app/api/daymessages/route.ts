import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSession } from "../ai/route";
import moment from "moment";

export async function GET(request: Request) {
  try {
    const {
      user: { email },
    } = (await getServerSession(authOptions)) as UserSession;

    const startOfDay = moment().startOf("day").toDate();

    const count = await client.user.findUnique({
      where: {
        email,
      },
      select: {
        chat: {
          where: {
            createdAt: {
              gte: startOfDay,
              lt: moment(startOfDay).add(1, "day").toDate(),
            },
          },
        },
      },
    });
    return NextResponse.json({ count: count?.chat.length }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
