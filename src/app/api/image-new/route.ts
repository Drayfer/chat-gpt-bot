import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Question, UserSession } from "../ai/route";
import axios from "axios";
import randomstring from "randomstring";
import { Configuration, OpenAIApi } from "openai";
import { google } from "googleapis";
import { getBase64Image } from "../history/[id]/route";

const { CLIENT_EMAIL, PRIVATE_KEY, FOLDER_ID } = process.env;
const SCOPE = ["https://www.googleapis.com/auth/drive"];

export const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    CLIENT_EMAIL,
    "",
    (PRIVATE_KEY as string).split(String.raw`\n`).join("\n"),
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
};

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
    // const imageUrl =
    //   "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png";

    if (!imageUrl?.length) {
      return NextResponse.json("no length", { status: 500 });
    }

    const drive = await google.drive({
      version: "v3",
      auth: await authorize(),
    });

    const fileMetaData = {
      name: `${email}_${randomstring.generate()}.png`,
      parents: [FOLDER_ID] as string[],
    };

    const { data } = await axios.get(imageUrl, { responseType: "stream" });
    const driveData = await drive.files.create({
      resource: fileMetaData,
      media: {
        body: data,
        mimeType: "image/png",
      },
      fields: "id",
    });
    const fileId = driveData.data.id as string;
    const user = await client.user.findUnique({
      where: { email },
    });
    await client.chat.create({
      data: {
        message: body.question,
        session: body.chatSession,
        userId: user?.id,
        answer: fileId,
        model: body.model,
      },
    });

    return NextResponse.json(
      { answer: await getBase64Image(fileId) },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
