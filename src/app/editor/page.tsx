"use client";
import { sendCode, sendCommand } from "../apis";
import { useState, useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import ConsoleUI from "./ConsoleUI";

export default function EditorPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [currentConsole, setCurrentConsole] = useState("py-json");
  const consoles = ["py-json", "cli"];

  const editorRef = useRef<any>();

  const handleSendCode = async (code: string) => {
    try {
      if (!code) throw new Error("Code is empty");
      const json_code = JSON.parse(code);

      const data = { code: json_code };

      const response = await sendCode(data);

      setStatus(response.status);
      setStdout(response.stdout);
      setStderr(response.stderr);
    } catch (err: Error | any) {
      setStatus("Frontend Error");
      setStdout(err.message);
    }
  };

  const handleSendCommand = async (command: string) => {
    try {
      if (!command) throw new Error("Command is empty");
      console.log(command);
      const data = { command: command };

      const response = await sendCommand(data);

      setStatus(response.status);
      setStdout(response.stdout);
      setStderr(response.stderr);
    } catch (err: Error | any) {
      setStatus("Frontend Error");
      setStdout(err.message);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        // Define your syntax highlighting rules here
        // For example:
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="title flex flex-col items-center justify-center py-4 my-10 min-h-2/3 w-10/12">
        <h1 className="text-5xl font-bold text-center">Code Editor</h1>
        <h2 className="text-2xl text-center font-semibold">
          Write your py-json code here
        </h2>
        <div className="flex items-center justify-center gap-2 flex-col lg:flex-row w-full py-6">
          <Editor
            height="32rem"
            defaultLanguage="json"
            defaultValue="{}"
            onChange={(value, event) => setCode(value ?? "")}
            onMount={handleEditorDidMount}
          />

          <ConsoleUI
            status={status}
            stdout={stdout}
            stderr={stderr}
          />
        </div>
        <div className="nav-btns flex flex-row gap-4">
          <button
            className="bg-gradient-to-r from-zinc-500 to-zinc-600 hover:from-zinc-600 hover:to-zinc-700 text-white font-bold py-2 px-4 rounded min-w-[10rem] max-w-[16rem] w-full select-none outline-none"
            onClick={() => {
              if (currentConsole === "py-json") {
                handleSendCode(code);
              } else {
                handleSendCommand(code);
              }
            }}
          >
            Compile
          </button>
          <button
            className="bg-gradient-to-r from-zinc-500 to-zinc-600 hover:from-zinc-600 hover:to-zinc-700 text-white font-bold py-2 px-4 rounded min-w-[10rem] max-w-[16rem] w-full select-none outline-none"
            onClick={() => {
              // change the current console to the next console,
              // allow circular navigation
              const currentIndex = consoles.indexOf(currentConsole);
              const nextIndex = (currentIndex + 1) % consoles.length;
              setCurrentConsole(consoles[nextIndex]);
              console.log(currentConsole);
            }}
          >
            Toggle Console
          </button>
        </div>
      </div>
    </main>
  );
}
