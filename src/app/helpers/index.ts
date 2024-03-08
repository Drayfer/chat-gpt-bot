import { google } from "googleapis";

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
