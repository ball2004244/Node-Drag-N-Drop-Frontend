"use client";
import { useState } from "react";
interface CodeButtonProps {
    code: string;
    text: string;
}

function CodeButton(codeButton: CodeButtonProps) {
    const handleClick = (codeButton: CodeButtonProps) => {
        console.log(`Your code is ${JSON.stringify(codeButton.code)}`);
    };
    return (
        <div className="code-button z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
            <button className="button w-full border-2 border-black rounded-xl p-4 m-4" onClick={() => handleClick(codeButton)}>
                <p className="text-black text-2xl font-bold text-center">{codeButton.text}</p>
            </button>
        </div>
    );
}

// This function accepts a CodeButtonProps object as an argument
export default function CodeButtons() {
      // use python code here
  const [codeButtons, setCodeButtons] = useState<CodeButtonProps[]>([
    { code: "print", text: "print" },
    { code: "for", text: "loop" },
    { code: "if", text: "if" },
    { code: "\t", text: "tab" },
  ]);

    return (
        <div className="code-button-list z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
            {codeButtons.map((codeButton) => (
                <CodeButton code={codeButton.code} text={codeButton.text} key={codeButton.code} />
            ))}
        </div>
    );
}