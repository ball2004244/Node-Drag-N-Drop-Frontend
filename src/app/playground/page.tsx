//  This file is for the Playground page.
//  It enable user to code Py-JSON through clicking buttons.
//  There will be several buttons for user to click, including:
// Print, Input, If, For, While, Function, Class, and Comment.
"use client";
import { getConfig } from "../apis";
import { useState } from "react";

export default function PlaygroundPage() {
    const [config, setConfig] = useState("");

    const handleTestButtonClick = async () => {
        const response = await getConfig();
        const config = JSON.parse(response.config);
        setConfig(JSON.stringify(config));
    };

    const formatCodeLine = (codeLine: string, value: string) => {
        return codeLine.replace("%s", value);
    };
    return (
        <div className="playground-page">
            <div className="playground-page__buttons">
                <button
                    className="p-4 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleTestButtonClick}
                >
                    Test
                </button>
                <div className="rendered-keywords">
                    {config}
                </div>
            </div>
        </div>
    );
}
