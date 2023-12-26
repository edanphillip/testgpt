//app/page.tsx
'use client'

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [response, setresponse] = useState("waiting for submit...")
  const [inputValue, setInputValue] = useState('');
  const submitform = async () => {
    setresponse("loading...");
    try {
      const { data } = await fetch(`/api/gpt/${inputValue}`, { method: "GET" })
        .then(data => data.json())
      console.log("fetched", data.choices[0]);
      var content = data.choices[0].message.content;
      setresponse(content);
    } catch (error) {
      setresponse("error: " + error);
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-y-5">
        <form action={submitform} className="flex w-full gap-5">

          <input type="text " className="text-black min-w-max " value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
        <div className="flex flex-col gap-4 justify-around p-4 border-2 border-white">
          <h2 className="text-xl font-bold">GPT response:</h2>
          <p className="flex ">{response}</p>
        </div>
      </div>
    </main>
  )
}
