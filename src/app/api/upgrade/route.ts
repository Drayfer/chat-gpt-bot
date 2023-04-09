import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(request: Request) {
  return NextResponse.json(
    {
      response: {
        checkout_url:
          "https://pay.fondy.eu/merchants/e37541aaa8952f4dc2e0f1f18a35e4443b695119/default/index.html?token=1e85b803110137934a04ec5e9cbe2c86b694d533",
      },
    },
    { status: 200 }
  );
}
