import { NextApiRequest, NextApiResponse } from "next";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

type Input = {
  image: string;
};

type Output = {
  caption: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Output | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const image = req.body.input.image;

  //@ts-ignore
  //   const { image }: { input: Input } = req.body;

  //   console.log(`image url in backend, ${image}`)

  try {
    //@ts-ignore
    const output = await replicate.run<Input, Output>(
      "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
      {
        input: {
          image,
          caption: true,
          temperature: 0.7
        },
      }
    ) as string;


    return res.status(200).json({ caption: output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
