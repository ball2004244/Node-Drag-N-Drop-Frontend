"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { CodeContext } from "./CodeUI";
import Editor, { Monaco } from "@monaco-editor/react";
import ConsoleUI from "../editor/ConsoleUI";
import { sendCode } from "../apis";

interface OutputProps {
  status: string;
  stdout: string;
  stderr: string;
}

export default function CodeDisplay() {
  const { pyjsonCode, setPyjsonCode, setKeywordsTracker } = useContext(CodeContext);
  const [isFromContext, setIsFromContext] = useState<boolean>(false);
  const [output, setOutput] = useState<OutputProps>({
    status: "",
    stdout: "",
    stderr: "",
  });

  const editorRef = useRef<any>();

  //  Extract the code from the textarea and send to api
  const handleCompile = async () => {
    // get the editor value
    const editorValue = editorRef.current.getValue();
    const compiledCode = JSON.parse(editorValue);
    const response = await sendCode(compiledCode);

    setPyjsonCode(compiledCode);
    setOutput(response);
  };

  //   convert the pyjsonCode to a string
  const formatPyjsonCode = (pyjsonCode: object): string => {
    const formattedPyjsonCode = JSON.stringify(pyjsonCode, undefined, 4);

    return formattedPyjsonCode;
  };

  // Update textarea value when pyjsonCode changes
  useEffect(() => {
    const formattedPyjsonCode = formatPyjsonCode(pyjsonCode);

    if (editorRef.current) editorRef.current.setValue(formattedPyjsonCode);

    setIsFromContext(true);
  }, [pyjsonCode]);

  // config for monaco editor
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        // Define your syntax highlighting rules here
        { token: "string.key.json", foreground: "#38BDF8" }, // JSON string key be blue
        { token: "string.value.json", foreground: "#C026D3" }, // JSON string value be purple
      ],
      colors: {
        "editor.background": "#18181B", // Background color be dark gray
        "editor.foreground": "#D4D4D4", // Text color be light gray
        "editor.lineHighlightBackground": "#2A2D2E", // Line highlight color be light gray
        "editorCursor.foreground": "#A7A7A7", // Cursor color
        "editor.selectionBackground": "#555555", // Selection color
        // Add more color customizations as needed
      },
    });

    monaco.editor.setTheme("myTheme");
  };

  const handleEditorChange = (event: any, value: string | undefined) => {
    event.preventDefault;
    // check if length is 0 or undefined
    // get the current value of monaco editor
    if (value!.length === 0 || value === undefined) {
      setPyjsonCode({});
      setKeywordsTracker({});
      return;
    }
    
    // This is when the change is from the context
    if (isFromContext) {
      setIsFromContext(false);
      return;
    }

    // This is when the change is from the editor
    // Only change the pyjsonCode if the change is valid JSON
    let validJsonCode = {};
    try {
      validJsonCode = JSON.parse(value!);
      setPyjsonCode(validJsonCode);
    } catch (e) {
      // if it goes here means the change is invalid
      // console.log("invalid JSON");
    }

    return;
  };

  return (
    <div className="code-display text-black text-xl font-light text-left m-4 h-full w-full flex flex-col justify-center items-center">
      <Editor
        height="32rem"
        defaultLanguage="json"
        defaultValue="{}"
        onChange={(event, value) => handleEditorChange(event, value)}
        onMount={handleEditorDidMount}
      />

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
  );
}
