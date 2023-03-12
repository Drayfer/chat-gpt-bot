import midjourney from "midjourney-client";
import { NextResponse } from "next/server";
import replicate from "replicate";

interface IQuestion {
  question: string;
}
export async function POST(request: Request) {
  const body: IQuestion = await request.json();
  //   const image = await midjourney(body.question, {
  //     width: 1024,
  //   });

  //   return NextResponse.json({ image }, { status: 200 });
  const prediction = await replicate
    .model(
      "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb"
    )
    .predict({
      prompt: body.question,
      width: 1024,
    });
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
  return NextResponse.json({ image: prediction.output }, { status: 200 });
}
