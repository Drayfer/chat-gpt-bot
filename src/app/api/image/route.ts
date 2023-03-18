import client from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import midjourney from "midjourney-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
// import replicate from "replicate";
import { Question, UserSession } from "../ai/route";

export async function POST(request: Request) {
  // const {
  //   user: { email },
  // } = (await getServerSession(authOptions)) as UserSession;
  // const body: Question = await request.json();

  // try {
  //   const image = await midjourney(body.question, {
  //     width: 1024,
  //     height: 768,
  //   });
  // const prediction = await replicate
  //   .model(
  //     "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb"
  //   )
  //   .predict({
  //     prompt: `mdjrny-v4 style ${body.question} 8k`,
  //     width: 1024,
  //   });
  // console.log(9888, prediction);
  // const prediction = await replicate
  //   .model(
  //     "prompthero/funko-diffusion:85a9b91c85d1a6d74a045286af193530215cb384e55ec1eaab5611a8e36030f8"
  //   )
  //   .predict({
  //     prompt: `photography of an Italian car in Tuscany, poolsuite style`,
  //     width: 1024,
  //   });
  // console.log(2222, prediction);
  // return NextResponse.json(
  //   {
  //     answer:
  //       "https://replicate.delivery/pbxt/cTDWlE4QPNbeTStgfMXLYBaQVlzAPf0WlLEU1aFLVsjeNdeEC/out-0.png",
  //   },
  //   { status: 200 }
  // );
  // if (!image[0]?.length) {
  //   return NextResponse.json("no length", { status: 500 });
  // }
  // const user = await client.user.findUnique({
  //   where: { email },
  // });
  // await client.chat.create({
  //   data: {
  //     message: body.question,
  //     session: body.chatSession,
  //     userId: user?.id,
  //     answer: image[0] as string,
  //     model: body.model,
  //   },
  // });
  // return NextResponse.json({ answer: prediction.output[0] }, { status: 200 });
  // return NextResponse.json(
  //   {
  //     answer:
  //       "https://replicate.delivery/pbxt/heOYV5gPQuVlWyJgbHlzc0CJKBdsGOiYVNyYDCGrQdpTspTIA/out-0.png",
  //   },
  //   { status: 200 }
  // );
  //   return NextResponse.json({ answer: image[0] }, { status: 200 });
  // } catch (err) {
  //   return NextResponse.json(err, { status: 500 });
  // }
  return NextResponse.json("ok", { status: 500 });
}

//   const prediction = await replicate
//     .model(
//       "allenhung1025/looptest:0de4a5f14b9120ce02c590eb9cf6c94841569fafbc4be7ab37436ce738bcf49f"
//     )
//     .predict(
//       {
//         seed: -1,
//       },
//       {
//         onUpdate: (prediction) => {
//           console.log(prediction.output);
//         },
//       }
//     );

//   console.log(prediction);
