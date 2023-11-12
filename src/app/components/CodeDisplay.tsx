"use client";
import { useContext } from "react";
import { CodeContext } from "./CodeUI";

export default function CodeDisplay() {
  const { pyjsonCode } = useContext(CodeContext);

  return (
    <div className="code-display text-black text-xl font-light text-left p-4 m-4">
      {Object.keys(pyjsonCode).map((key) => (
        <div className="code-block">
          <p className="code">
            {key}: {pyjsonCode[key]}
          </p>
        </div>
      ))}
    </div>
  );
}
