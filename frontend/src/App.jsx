import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import StoryOutput from "./components/StoryOutput";
import axios from "axios";
import SideBar from "./components/SideBar";

function App() {
  const [generatedStory, setGeneratedStory] = useState("");
  const [prompt, setPrompt] = useState("");

  const generateStory = async (prompt) => {
    const apiUrl = "https://api.textcortex.com/internal-stream/v1/chats";

    const requestBody = {
      customization_id: "ad08fcfd-a824-47f3-95a0-c7d1a94cd5b1",
      input: prompt,
      model: "chat-sophos-1",
      response_type: "text/markdown",
      source_lang: "en",
    };

    const requestOptions = {
      method: "POST",
      url: apiUrl,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5NjE0OTUyMSwianRpIjoiNDM5N2JhZDMtMzY0OS00YmZiLWEzNjktYzQ0ODdmNGVjNWIwIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiNzAwYTFhNDUtMTYxNC00ZmRhLTg2OTEtNTMzNDQzYWU2Y2JhIiwibmJmIjoxNjk2MTQ5NTIxLCJleHAiOjE2OTg3NDE1MjF9.CHiOH_YjGsgDcpWCq8sEl6wfMJF9XWokdIapwFXKc7E`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(requestBody),
    };

    try {
      const response = await axios(requestOptions);
      const data = await response.data;
      handleApiResponse(data, prompt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApiResponse = async (response) => {
    const events = response.split("\n");
    let generatedStory = "";

    for (const event of events) {
      if (event.startsWith("data: ")) {
        const eventData = JSON.parse(event.substring(6));
        if (eventData.status === "success" && eventData.outputs) {
          const outputText = eventData.outputs[0].text;
          generatedStory += outputText;
        }
      }
    }
    console.log("Generated");
    setGeneratedStory(generatedStory);
  };

  return (
    <>
      <div>
        <main className="flex gap-2 h-[90vh]">
          <SideBar />
          <div className="flex flex-col justify-between border w-[90%]">
            <StoryOutput
              generatedStory={generatedStory}
              prompt={prompt}
            />
            <PromptInput generateStory={generateStory} prompt={prompt} setPrompt={setPrompt}  />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
