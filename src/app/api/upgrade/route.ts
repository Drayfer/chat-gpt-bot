import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(request: Request) {
  return NextResponse.json({ test: 1 }, { status: 200 });
}
