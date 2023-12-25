'use client'

import { useState } from "react";

export default function Home() {
  const [response, setresponse] = useState("waiting for submit...")
  const submitform = async () => {
    setresponse("loading...");
    try {

      const { data } = await fetch("/api/gpt").then((data) => {
        console.log("fetched", data);
        return data.json();
      })
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
      <div className="flex-col gap-y-5">
        <form action={submitform} className="flex gap-5">
          <input type="text" className="text-black"></input>
          <button type="submit">Submit</button>
        </form>
        <p className="flex pt-10">{response}</p>

      </div>
    </main>
  )
}
