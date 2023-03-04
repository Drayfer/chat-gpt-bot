import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";

export async function Cors(req: NextApiRequest, res: NextApiResponse) {
  return await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
}
