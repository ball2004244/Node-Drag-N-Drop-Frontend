"use client";
import { useContext, useRef } from "react";
import { CodeContext, KeywordsDict } from "./CodeUI";
import Image from "next/image";

const CodeEditor = () => {
  const { pyjsonCode, setPyjsonCode, keywordsTracker, setKeywordsTracker } =
    useContext(CodeContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderKey = (code: [string, string]) => {
    const [key, value] = code;
    return (
      <div className="flex items-center" key={key}>
        <p className="text-white text-xl font-semibold text-center mr-4 my-2">
          {key}
        </p>

        {key.startsWith("end") ? null : (
          <input
            className="w-full h-8 bg-gray-700 rounded-lg p-2 text-white text-xl font-semibold text-left outline-none"
            type="text"
            value={value}
            onChange={(e) => {
              const newPyjsonCode = [...pyjsonCode];
              const codeIdx = newPyjsonCode.findIndex(
                (code) => code[0] === key
              );
              newPyjsonCode[codeIdx][1] = e.target.value;
              setPyjsonCode(newPyjsonCode);
            }}
          />
        )}

        <button
          className="delete-btn flex border-2 border-black rounded-xl p-3 m-3 justify-center items-center text-2xl font-bold text-center bg-gray-800 text-white hover:bg-gray-900"
          onClick={() => {
            // change items in keywordsTracker
            const newKeywordsTracker: KeywordsDict = { ...keywordsTracker };
            const temp = key.match(/([a-zA-Z]+)([0-9]*)/) as RegExpMatchArray;
            const keyword: string = temp[1];
            const rawFreq: string = temp[2];
            let freq: number = parseInt(rawFreq);
            const currentKeyword = keywordsTracker[keyword];

            // check if freq is in currentKeyword
            if (currentKeyword.includes(freq)) {
              // remove the item with order freq-th from currentKeyword
              const keywordTrackerIdx = currentKeyword.indexOf(freq);
              newKeywordsTracker[keyword].splice(keywordTrackerIdx, 1);

              // remove the same item from pyjsonCode
              const pyjsonIdx = pyjsonCode.findIndex((code) => code[0] === key);
              const newPyjsonCode = [...pyjsonCode];
              newPyjsonCode.splice(pyjsonIdx, 1);

              // update pyjsonCode and keywordsTracker
              setPyjsonCode(newPyjsonCode);
              setKeywordsTracker(newKeywordsTracker);
            }
          }}
        >
          <Image src="/trash-can.svg" alt="delete" width={24} height={24} />
        </button>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col items-left w-full h-[30rem] bg-gray-800 rounded-lg overflow-auto p-4 m-4"
      ref={containerRef}
    >
      {pyjsonCode.map(renderKey)}
    </div>
  );
};

export default CodeEditor;
