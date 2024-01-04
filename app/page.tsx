//app/page.tsx
'use client'

import { ChangeEvent, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Style } from "util";
import model, { modelList } from "./models";
interface Message {
  text: string,
  model: model,
  from: "gpt" | "user",
}
export default function Home() {
  const [response, setresponse] = useState("waiting for submit...")
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([])
  const [selectedModel, setSelectedModel] = useState<model>("gpt-4-1106-preview")
  const submitform = async () => {
    setIsLoading(true);
    chatHistory.push({ from: "user", model: selectedModel, text: inputValue })
    let newchathistory = chatHistory;
    setChatHistory(newchathistory)
    getGPTResponse();
    setInputValue('');
  }
  const getGPTResponse = async () => {
    try {
      var url = `/api/gpt/${selectedModel}/${inputValue}/`
      const { data } = await fetch(url, { method: "GET" })
        .then(data => data.json())
      console.log("fetched", data.choices[0]);
      var content = data.choices[0].message.content;
      setresponse(content);
      chatHistory?.push({ from: "gpt", model: selectedModel, text: content })
      let newchathistory = chatHistory;
      setChatHistory(newchathistory)
      setIsLoading(false);
    } catch (error) {
      setresponse("error: " + error);
      console.error(error);
    }

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-y-5">
        <p className="inline-block relative  ">Choose Model</p>
        <select className="inline-block relative bg-gray-600 p-2 rounded-lg  w-[80%] " onChange={(e) => setSelectedModel(e.currentTarget.value as model)} value={selectedModel}  >
          {modelList.map(item => <option value={item} key={item} >{item}</option>)}
        </select>
        <div className="flex flex-col gap-4 justify-around p-4 border-2 border-white">
          <h2 className="text-xl font-bold">Chat:</h2>
          {chatHistory && chatHistory.map(item => {
            if (item.from === "user") {
              return <><p className="bg-gray-600 mr-0 ml-auto max-w-fit text-right p-2 rounded-xl">{item.text}</p> </>
            }
            if (item.from === "gpt") {
              return <><p className="bg-gray-800 mr-auto ml-0  max-w-fit p-2 rounded-xl">{item.text}</p> </>
            }
          })
          }
          {/* <p className="flex " dangerouslySetInnerHTML={{ __html: response }}></p> */}

          <form action={submitform} className="relative ">
            <BeatLoader color="gray" loading={isLoading} />
            <span className="inline-block overflow-hidden w-[80%] relative">
              <textarea className="bg-gray-600 p-2 rounded-lg  w-[100%] " value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </span>
            <button type="submit" className="inline-block align-top h-[100%] m-auto relative w-[20%] min-w-[50px]">Submit</button>
          </form>
        </div>
      </div>
    </main>
  )
}
