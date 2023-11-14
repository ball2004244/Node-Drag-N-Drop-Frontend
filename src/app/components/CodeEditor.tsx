"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { CodeContext } from "./CodeUI";


// TODO: Rewrite the CodeEditor using div and textinput
// The pyjsonCode will be rendered as a string in the textinput
// In JSON syntax, with many key-val pairs
// Where the key is rendered with p tag, 
// And value is rendered with input tag
const CodeEditor = () => {
  const { pyjsonCode, setPyjsonCode } = useContext(CodeContext);
  const [keys, setKeys] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setKeys(Object.keys(pyjsonCode));
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [pyjsonCode]);

  const renderKey = (key: string) => {
    return (
      <div className="flex items-center" key={key}>
        <p className="text-white text-xl font-semibold text-center mr-4 my-2">
          {key}
        </p>
        
        {key.startsWith('end') ? null : (
          <input 
            className="w-full h-8 bg-gray-700 rounded-lg p-2 text-white text-xl font-semibold text-left outline-none"
            type="text" 
            value={pyjsonCode[key]} 
            onChange={(e) => {
              setPyjsonCode({ ...pyjsonCode, [key]: e.target.value });
            }}
          />
        )}
          
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-left w-full h-[30rem] bg-gray-800 rounded-lg overflow-auto p-4 m-4"
      ref={containerRef}
    >
      {keys.map(renderKey)}
    </div>
  )
}

export default CodeEditor;