import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();
  console.log("api hit")
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-4-1106-preview",
    });
    console.log(completion.choices[0]);
    return completion;
  }
  const data = await main();

  return Response.json({ data })
}