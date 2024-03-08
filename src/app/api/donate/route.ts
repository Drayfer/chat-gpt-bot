import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSession } from "../ai/route";
interface IBody {
  text: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { data: "ok" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
