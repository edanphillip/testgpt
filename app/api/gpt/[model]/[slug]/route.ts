//app/api/gpt/route.ts
import model from "@/app/models";
import { NextApiRequest } from "next";
import OpenAI from "openai";
// export async function GET(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   const slug = params.slug // 'a', 'b', or 'c'
//   console.log("slug:", slug)
//   return new Response(slug)
// }
export async function GET(request: NextApiRequest, { params }: { params: { slug: string, model: model } }) {
  const slug = params.slug // 'a', 'b', or 'c'
  const model = params.model // 'a', 'b', or 'c'
  const openai = new OpenAI();
  console.log("api hit");
  let message = slug ? slug : "No message provided";
  async function main() {
    // let finetuning = "I need you to only respond to the prompt in html format (you're only allowed to use <p>, <h2>, <h3>, <h4>,  <ul>, <li>). DO NOT precede the html code with any text nor follow the code with any more text. Here is the prompt: "
    let finetuning = ""
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: finetuning + message }],
      model: model,

    });
    console.log(completion.choices[0]);
    return completion;
  }
  const data = await main();

  return Response.json({ data })
}