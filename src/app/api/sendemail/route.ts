import client from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import nodemailer from "nodemailer";
import { UserSession } from "../ai/route";

export async function GET(request: Request) {
  try {
    // const {
    //   user: { email },
    // } = (await getServerSession(authOptions)) as UserSession;

    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ukr.net",
    //   port: 465,
    //   secure: true, // true for 465, false for other ports
    //   auth: {
    //     user: process.env.NODEMAILER_EMAIL, // generated ethereal user
    //     pass: process.env.NODEMAILER_EMAIL_PASSWORD, // generated ethereal password
    //   },
    // });

    // await transporter.sendMail({
    //   from: process.env.NODEMAILER_EMAIL, // sender address
    //   to: "aigptchatbot@gmail.com", // list of receivers
    //   subject: "Open Access", // Subject line
    //   text: email, // plain text body
    // });

    return NextResponse.json({ data: "ok" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
