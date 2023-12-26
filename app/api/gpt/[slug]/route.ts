//app/api/gpt/route.ts
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
export async function GET(request: NextApiRequest, { params }: { params: { slug: string } }) {

  const slug = params.slug // 'a', 'b', or 'c'
  const openai = new OpenAI();
  console.log("api hit");
  let message = slug ? slug : "No message provided";
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-4-1106-preview",
    });
    console.log(completion.choices[0]);
    return completion;
  }
  const data = await main();

  return Response.json({ data })
}