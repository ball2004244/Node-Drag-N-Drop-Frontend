"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { CodeContext } from "./CodeUI";
import Image from "next/image";
import { KeywordsDict } from "./CodeUI";

// TODO: Rewrite the CodeEditor using div and textinput
// The pyjsonCode will be rendered as a string in the textinput
// In JSON syntax, with many key-val pairs
// Where the key is rendered with p tag,
// And value is rendered with input tag
const CodeEditor = () => {
  const { keywordsTracker, setKeywordsTracker } = useContext(CodeContext);
  const [keys, setKeys] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update the keys when pyjsonCode changes
  useEffect(() => {
    const newKeys: string[] = [];
    const newValues: string[] = [];

    for (const key in keywordsTracker) {
      keywordsTracker[key].forEach((idx) => {
        newKeys.push(`${key}${idx}`);
        newValues.push("");
      });

      console.log(keys);
    }

    setKeys(newKeys);
    setValue(newValues);
  }, [keywordsTracker]);

  // Update values based on input

  const renderKey = (key: string) => {
    return (
      <div className="flex items-center" key={key}>
        <p className="text-white text-xl font-semibold text-center mr-4 my-2">
          {key}
        </p>

        {key.startsWith("end") ? null : (
          <input
            className="w-full h-8 bg-gray-700 rounded-lg p-2 text-white text-xl font-semibold text-left outline-none"
            type="text"
            value={value[keys.indexOf(key)]}
            onChange={(e) => {
              const newValues = [...value];
              newValues[keys.indexOf(key)] = e.target.value;
              setValue(newValues);
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
            const rawIdx: string = temp[2];
            let idx = parseInt(rawIdx);

            // check if idx in keywordsTracker[keyword]
            if (keywordsTracker[keyword].includes(idx)) {
              // remove idx from keywordsTracker[keyword]
              const i = keywordsTracker[keyword].indexOf(idx);
              newKeywordsTracker[keyword].splice(i, 1);

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
      {keys.map(renderKey)}
    </div>
  );
};

export default CodeEditor;
