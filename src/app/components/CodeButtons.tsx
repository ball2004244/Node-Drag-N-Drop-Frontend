"use client";
import { useState, useEffect, useContext } from "react";
import { getConfig } from "../apis";
import { CodeContext } from "./CodeUI";
interface CodeButtonProps {
  title: string;
  inputValue?: string;
  code: string;
}

// dont use any for event
function CodeButton(codeButton: CodeButtonProps, event: React.MouseEvent) {
  const { pyjsonCode, setPyjsonCode, keywordsTracker, setKeywordsTracker } =
    useContext(CodeContext);

  // Add current line code to main code when clicked
  const handleClick = async (codeButton: CodeButtonProps) => {
    //Look up current key in keywordsTracker
    if (codeButton.title in keywordsTracker)
      keywordsTracker[codeButton.title] += 1;
    else keywordsTracker[codeButton.title] = 1;
    setKeywordsTracker(keywordsTracker);

    // Use index to count the frequency of keywords, prevent duplicate keys
    const codeIdx = keywordsTracker[codeButton.title];
    const pyjsonCodeKey = `${codeButton.title}${codeIdx}`;

    // Get the current pyjsonCode and add the new code
    const newPyjsonCode = { ...pyjsonCode };
    newPyjsonCode[pyjsonCodeKey] = "";

    setPyjsonCode(newPyjsonCode);
  };

  return (
    <div className="code-button z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
      <button
        className="button w-full border-2 border-black rounded-xl p-4 m-4 text-xl font-bold text-center text-black bg-gray-800 text-white hover:bg-gray-900"
        onClick={() => handleClick(codeButton)}
      >
        {codeButton.title}
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
    <div className="code-button-list z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col overflow-auto h-full">
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
