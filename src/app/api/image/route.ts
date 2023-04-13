import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Question, UserSession } from "../ai/route";
import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import randomstring from "randomstring";

const s3 = new S3({
  region: "eu-north-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

import Replicate from "replicate";

export async function POST(request: Request) {
  const body: Question = await request.json();

  try {
    const {
      user: { email },
    } = (await getServerSession(authOptions)) as UserSession;

    const keyData = await client.settings.findFirst({
      where: {
        imageKey: {
          not: "",
        },
      },
    });
    const replicate = new Replicate({
      auth: keyData?.imageKey as string,
    });
    const model =
      "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb";
    const input = { prompt: `mdjrny-v4 style ${body.question} 8k` };
    const output = (await replicate.run(model, {
      input,
    })) as string[];
    // const output = [
    //   "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    // ];

    if (!output[0]?.length) {
      return NextResponse.json("no length", { status: 500 });
    }

    const { data } = await axios({
      method: "get",
      url: output[0],
      responseType: "arraybuffer",
    });

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${randomstring.generate()}.png`,
      Expires: 600,
      ContentType: "image/png",
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios.put(url, data, {
      headers: {
        "Content-type": "image/png",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const imgUrl = url.split("?")[0];

    const user = await client.user.findUnique({
      where: { email },
    });
    await client.chat.create({
      data: {
        message: body.question,
        session: body.chatSession,
        userId: user?.id,
        answer: imgUrl,
        model: body.model,
      },
    });
    return NextResponse.json({ answer: imgUrl }, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
