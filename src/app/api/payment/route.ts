import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";

export async function GET(request: Request) {
  try {
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
      "https://diaka.ua/api/v1/message/stats?action=recent&conveyorHash=ONPBO49zxX4WIxTcjBWAzquR985yD3Rs&params%5Blimit%5D=10&params%5Btest%5D=1"
    );

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: "aigptchatbot@gmail.com", // list of receivers
      subject: "Paid Access!!!", // Subject line
      text: `Need open access to ${data[0].name} ${JSON.stringify(data)}`,
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
