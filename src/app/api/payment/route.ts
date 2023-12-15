import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSession } from "../ai/route";

export async function GET() {
  try {
    const {
      user: { email },
    } = (await getServerSession(authOptions)) as UserSession;
    let transporter = nodemailer.createTransport({
      host: "smtp.ukr.net",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_EMAIL, // generated ethereal user
        pass: process.env.NODEMAILER_EMAIL_PASSWORD, // generated ethereal password
      },
    });
     const { data } = await axios(
       "https://diaka.ua/api/v1/message/stats?action=recent&conveyorHash=ledVV43_827rc2Wroo7NLOs5tJrdfnja&params%5Blimit%5D=10&params%5Btest%5D=1"
     );
     await transporter.sendMail({
       from: process.env.NODEMAILER_EMAIL, // sender address
       to: "aigptchatbot@gmail.com", // list of receivers
       subject: "Check Paid Access!!!", // Subject line
       text: `Check paid access to ${email} \n ${JSON.stringify(data)}`,
     });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
