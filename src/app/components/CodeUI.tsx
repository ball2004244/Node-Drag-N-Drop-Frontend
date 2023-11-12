"use client";
import CodeButtons from "./CodeButtons";
import CodeDisplay from "./CodeDisplay";
import { createContext, useState } from "react";

// set custom type
export type PyjsonCodeType = { [key: string]: string };

// use keywordsdict to count the frequency of keywords
export type KeywordsDict = { [key: string]: number };

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

  const [keywordsTracker, setKeywordsTracker] = useState<KeywordsDict>({});
  return (
    <div className="grid w-full max-w-5xl grid-cols-3 gap-4">
      <CodeContext.Provider
        value={{
          pyjsonCode,
          setPyjsonCode,
          keywordsTracker,
          setKeywordsTracker,
        }}
      >

        <div className="content col-span-2 justify-center items-center max-h-screen h-full flex flex-col">
          <p className="text-white text-2xl font-bold text-center">
            Code Area
          </p>
          <CodeDisplay />
        </div>
        
        <div className="sidebar col-span-1 justify-center items-center max-h-screen h-full flex flex-col">
          <p className="text-white text-2xl font-bold text-center">Sidebar</p>
          <CodeButtons />
        </div>
      </CodeContext.Provider>
    </div>
  );
}
