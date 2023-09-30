import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function PromptInput({ generateStory, prompt, setPrompt }) {

    const handleGenerateStory = () => {
        generateStory("Generate a short story about " + prompt);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-4"
        >
            <input
                ref={(input) => input && input.focus()}
                placeholder="Enter your prompt..."
                className="w-full h-10 border focus:outline focus:outline-blue-500 rounded p-2"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                className="bg-blue-500 outline-none border-none text-white px-4 rounded hover:bg-blue-600"
                onClick={handleGenerateStory}
            >
                <FaPaperPlane />
            </button>
        </form>
    );
}

export default PromptInput;
