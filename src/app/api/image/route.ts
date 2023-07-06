import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Question, UserSession } from "../ai/route";
import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import randomstring from "randomstring";
import { Configuration, OpenAIApi } from "openai";

const s3 = new S3({
  region: "eu-north-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

export async function POST(request: Request) {
  const body: Question = await request.json();

  try {
    const {
      user: { email },
    } = (await getServerSession(authOptions)) as UserSession;

    const keyData = await client.settings.findFirst({
      where: {
        openaiKeyPaid: {
          not: "",
        },
      },
    });
    const configuration = new Configuration({
      apiKey: keyData?.openaiKeyPaid,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: body.question,
      n: 1,
      size: "512x512",
      response_format: "url",
    });
    const imageUrl = response.data.data[0].url;

    // const imageUrl = [
    //   "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    // ];

    if (!imageUrl?.length) {
      return NextResponse.json("no length", { status: 500 });
    }

    const { data } = await axios({
      method: "get",
      url: imageUrl,
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
