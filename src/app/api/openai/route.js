import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

export async function POST(req) {
  const data = await req.json();
  console.log("Data:", data);

  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: "Generate a scene for animation with the following description:  "+data["chatMessage"],
    size: "512x512"
  });

  console.log("response:", response);
  
  return NextResponse.json({
    message: response.data[0]?.url
  });
}
