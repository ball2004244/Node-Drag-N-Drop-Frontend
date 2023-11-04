"use client";
import { sendCode } from "../apis";
import { useState } from "react";

export default function EditorPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const bracketsMap: { [key: string]: string } = {
    "(": ")",
    "{": "}",
    "[": "]",
    "'": "'",
    '"': '"',
    "`": "`",
  };

  const handleSendCode = async (code: string) => {
    try {
        if (!code) throw new Error("Code is empty");
        const json_code = JSON.parse(code);

        const data = { code: json_code };

        const response = await sendCode(data);
        const formattedStdout = codeFormatter(response.stdout);
        setStatus(response.status);
        setStdout(formattedStdout);
        setStderr(response.stderr);

    } catch (err: Error | any) {
        setStatus("Frontend Error");
        setStdout(err.message);
    }
  };
  
  const codeFormatter = (code: string) => {
    // replace the \n with a new line
    const formattedCode = code.replace(/\\n/g, "\n");

    // replace the \t with a tab
    const formattedCode2 = formattedCode.replace(/\\t/g, "\t");

    return formattedCode2;
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="title flex flex-col items-center justify-center py-10 my-10 min-h-2/3 w-10/12">
        <h1 className="text-5xl font-bold text-center">Code Editor</h1>
        <div className="flex items-center justify-center gap-2 flex-row w-full">
          <textarea
            className="text-2xl font-bold my-10 w-full items-center justify-center resize-none h-[32rem] p-4 border-1 border-xl border-gray-300 rounded-xl dark:border-neutral-800 dark:bg-zinc-800/30"
            placeholder="Write your code in Python here..."
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <div className="flex flex-col gap-2 flex-row bg-black dark:bg-gray-800 rounded-xl w-full h-[32rem] p-4">
            <h2 className="text-2xl font-bold text-white mb-2">Console</h2>
            <h3 className="text-xl text-white m-1">Status: {status}</h3>
            <h3 className="text-xl text-white m-1">Stdout: {stdout}</h3>
            <h3 className="text-xl text-white m-1">Stderr: {stderr}</h3>
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-zinc-500 to-zinc-600 hover:from-zinc-600 hover:to-zinc-700 text-white font-bold py-2 px-4 rounded w-1/4"
          onClick={() => handleSendCode(code)}
        >
          Compile
        </button>
      </div>
    </main>
  );
}
