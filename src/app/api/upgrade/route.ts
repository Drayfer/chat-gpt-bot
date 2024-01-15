import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(request: Request) {
  return NextResponse.json(
    {
      response: {
        checkout_url: "https://ai-chat.icu/",
      },
    },
    { status: 200 }
  );
}
