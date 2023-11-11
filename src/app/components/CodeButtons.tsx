"use client";
import { useState, useEffect } from "react";
import { sendCode, getConfig } from "../apis";
interface CodeButtonProps {
  title: string;
  inputValue?: string;
  code: string;
}

function CodeButton(codeButton: CodeButtonProps) {
  const handleClick = async (codeButton: CodeButtonProps) => {
    // When click, the code will be assembled
    // TODO: Create a master Data structure to store and assemble the code
    // TODO: Implement this with React Context API

  };

  return (
    <div className="code-button z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
      <button
        className="button w-full border-2 border-black rounded-xl p-4 m-4"
        onClick={() => handleClick(codeButton)}
      >
        <p className="text-black text-2xl font-bold text-center">
          {codeButton.title}
        </p>
      </button>
    </div>
  );
}

interface KeywordsDict {
  [key: string]: string;
}

// This function accepts a CodeButtonProps object as an argument
export default function CodeButtons() {
  const [codeButtons, setCodeButtons] = useState<CodeButtonProps[]>([]);
  const [loading, setLoading] = useState(true);

  // load config on first render
  useEffect(() => {
    if (loading) {
      loadConfigs();
      setLoading(false);
    }
  }, []);

  const loadConfigs = async () => {
    const response = await getConfig();
    const config = JSON.parse(response.config);
    const keywords: KeywordsDict = {};

    const categoriesContent: object[] = Object.values(config);

    categoriesContent.forEach((category: object) => {
      Object.assign(keywords, category);
    });

    await loadButtons(keywords);
  };

  const loadButtons = async (keywords: KeywordsDict) => {
    const codeButtonsConfig: CodeButtonProps[] = [];

    // set the key as title and value as code
    Object.keys(keywords).forEach((key) => {
      codeButtonsConfig.push({ title: key, code: keywords[key] });
    });

    setCodeButtons(codeButtonsConfig);
  };

  return (
    <div className="code-button-list z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
      {codeButtons.map((codeButton) => (
        <CodeButton
          code={codeButton.code}
          title={codeButton.title}
          key={codeButton.title}
        />
      ))}
    </div>
  );
}
