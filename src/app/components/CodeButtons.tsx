"use client";
import { useState, useEffect, useContext } from "react";
import { getConfig } from "../apis";
import { CodeContext } from "./CodeUI";
interface CodeButtonProps {
  title: string;
  inputValue?: string;
  code: string;
}

function CodeButton(codeButton: CodeButtonProps) {
  const { pyjsonCode, setPyjsonCode, keywordsTracker, setKeywordsTracker } =
    useContext(CodeContext);

  //* This function is called when a code button is clicked
  //* It adds the code to the pyjsonCode array
  //* And updates the keywordsTracker
  const handleClick = async (codeButton: CodeButtonProps) => {
    let codeIdx = 1;

    //Look up current key in keywordsTracker
    if (keywordsTracker[codeButton.title])
      // get last item in the array
      for (let i = 0; i < keywordsTracker[codeButton.title].length; i++) {
        codeIdx = keywordsTracker[codeButton.title][i] + 1;
      }

    // add code to pyjsonCode
    setPyjsonCode([
      ...pyjsonCode,
      [`${codeButton.title}${codeIdx}`, codeButton.inputValue || ""],
    ]);

    setKeywordsTracker({
      ...keywordsTracker,
      [codeButton.title]: keywordsTracker[codeButton.title]
        ? [...keywordsTracker[codeButton.title], codeIdx]
        : [codeIdx],
    });
  };

  return (
    <div className="code-button z-10 w-full h-16 items-center justify-between font-mono flex">
      <button
        className="button w-full h-full border-2 border-black rounded-xl p-4 m-4 text-xl font-bold text-center text-black bg-gray-800 text-white hover:bg-gray-900"
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
    // limit the number of rows, if over, then scroll
    <div className="code-button-list z-10 w-full h-full items-center justify-between font-mono text-sm flex flex-col overflow-auto gap-4">
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
