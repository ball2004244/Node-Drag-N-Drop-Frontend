"use client";
import Editor, { Monaco } from "@monaco-editor/react";
import { useEffect, useRef, useContext } from "react";
import { CodeContext } from "./CodeUI";

// export the custom editor component
const CodeEditor = () => {
  // Defines variables
  const { pyjsonCode, setPyjsonCode } = useContext(CodeContext);
  const intervalTime = 3000; // 3 seconds
  const editorRef = useRef<any>();

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

  //   convert the pyjsonCode to a string
  const formatPyjsonCode = (pyjsonCode: object): string => {
    const formattedPyjsonCode = JSON.stringify(pyjsonCode, undefined, 4);

    return formattedPyjsonCode;
  };

  // Check if the string is valid JSON
  const isValidJson = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
    } catch (e: Error | any) {
      return false;
    }
    return true;
  };

  // Update the pyjsonCode based on the textarea value
  const updatePyjsonCode = () => {
    const editorValue = editorRef.current?.getValue();
    if (isValidJson(editorValue)) {
      const updatedPyjsonCode = JSON.parse(editorValue);
      setPyjsonCode(updatedPyjsonCode);
    }
  };

  // Update the pyjsonCode every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updatePyjsonCode();
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // This code will run when pyjsonCode changes, functioning is to update the textarea value
  useEffect(() => {
    const formattedPyjsonCode = formatPyjsonCode(pyjsonCode);

    if (editorRef.current) editorRef.current.setValue(formattedPyjsonCode);
  }, [pyjsonCode]);

  // Add event listener to prevent page reload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Editor
      height="32rem"
      defaultLanguage="json"
      defaultValue="{}"
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
