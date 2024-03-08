import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { UserSession } from "../../ai/route";
import { authorize } from "../../image-new/route";
import { google } from "googleapis";

interface IParams {
  params: {
    id: String;
  };
}

export const getBase64Image = async (fileId: string) => {
  const drive = await google.drive({ version: "v3", auth: await authorize() });
  try {
    const dataURI = await new Promise((resolve, reject) => {
      drive.files.get(
        {
          fileId: fileId,
          alt: "media",
        },
        {
          responseType: "arraybuffer",
        },
        function (err, response) {
          if (err) {
            reject(err);
          } else {
            if (!response) {
              reject("no data");
              return;
            }
            const imageType = response.headers["content-type"];
            const base64 = Buffer.from(
              response.data as WithImplicitCoercion<string>,
              "utf8"
            ).toString("base64");
            const dataURI = "data:" + imageType + ";base64," + base64;
            resolve(dataURI);
          }
        }
      );
    });

    return dataURI;
  } catch (err) {
    return err;
  }
};

export async function GET(request: Request, { params }: IParams) {
  const {
    user: { email },
  } = (await getServerSession(authOptions)) as UserSession;
  const { id } = params;
  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    const messages = await client.chat.findMany({
      where: {
        userId: user?.id,
        session: Number(id),
      },
      select: {
        message: true,
        answer: true,
        session: true,
        createdAt: true,
        model: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const messagesArr = await Promise.all(
      messages.map(async (item) =>
        item.model === 1
          ? item.answer?.startsWith("https")
            ? { ...item, answer: item.answer }
            : { ...item, answer: await getBase64Image(item.answer as string) }
          : item
      )
    );
    return NextResponse.json(messagesArr, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
