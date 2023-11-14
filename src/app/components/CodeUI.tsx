"use client";
import CodeButtons from "./CodeButtons";
import { sendCode } from "../apis";
import ConsoleUI from "../editor/ConsoleUI";
import { createContext, useState } from "react";
import CodeEditor from "./CodeEditor";

// Interface for console output
interface OutputProps {
  status: string;
  stdout: string;
  stderr: string;
}
// set custom type
export type PyjsonCodeType = { [key: string ]: string };

// use keywordsdict to count the frequency of keywords
export type KeywordsDict = { [key: string]: Array<number> };

// setup Context to keep track of PyjsonCode
interface CodeContextProps {
  pyjsonCode: PyjsonCodeType;
  setPyjsonCode: (pyjsonCode: PyjsonCodeType) => void;
  keywordsTracker: KeywordsDict;
  setKeywordsTracker: (keywordsTracker: KeywordsDict) => void;
}

export const CodeContext = createContext({} as CodeContextProps);

export default function CodeUI() {
  const [pyjsonCode, setPyjsonCode] = useState<PyjsonCodeType>({});
  const [output, setOutput] = useState<OutputProps>({
    status: "",
    stdout: "",
    stderr: "",
  });

  // translate from keywordsTracker to pyjsonCode


  // Send code to API endpoint
  const handleCompile = async () => {
    
    

    const response = await sendCode(pyjsonCode);
    setOutput(response);
  };
  const [keywordsTracker, setKeywordsTracker] = useState<KeywordsDict>({});
  return (
    <div className="grid w-full max-w-5xl grid-cols-3 gap-4 justify-center items-center">
      <CodeContext.Provider
        value={{
          pyjsonCode,
          setPyjsonCode,
          keywordsTracker,
          setKeywordsTracker,
        }}
      >
        <div className="content col-span-2 justify-center items-center max-h-screen h-full w-full flex flex-col">
          <p className="text-white text-2xl font-bold text-center">Code Area</p>
          <CodeEditor />

          <ConsoleUI
            status={output.status}
            stdout={output.stdout}
            stderr={output.stderr}
            currentConsole="PYJSON"
            height="14rem"
          />
          <button
            className="compile-btn flex w-1/3 border-2 border-black rounded-xl p-4 m-4 justify-center items-center text-2xl font-bold text-center bg-gray-800 text-white hover:bg-gray-900"
            onClick={handleCompile}
          >
            Compile
          </button>
        </div>

        <div className="sidebar col-span-1 justify-center items-center max-h-screen h-full w-full flex flex-col">
          <p className="text-white text-2xl font-bold text-center">Sidebar</p>
          <CodeButtons />
        </div>
      </CodeContext.Provider>
    </div>
  );
}
