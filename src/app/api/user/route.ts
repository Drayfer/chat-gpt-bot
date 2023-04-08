import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSession } from "../ai/route";

export async function GET(request: Request) {
  try {
    const {
      user: { email },
    } = (await getServerSession(authOptions)) as UserSession;

    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    return NextResponse.json({ paid: user?.paid }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
