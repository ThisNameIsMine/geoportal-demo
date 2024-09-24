"use client"; // Ensure this component runs on the client side

import React, { useState } from "react";

const AIChatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for toggling chat window

  const sendMessageToAPI = async (message) => {
    try {
      setIsLoading(true);

      // Make the API call to the AI route
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error("Error generating AI response");
      }

      const data = await response.json();

      setChatHistory((prev) => [
        ...prev,
        { sender: "user", message },
        { sender: "ai", message: data.output }, // AI response
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    sendMessageToAPI(userInput);
    setUserInput("");
  };

  return (
    <div>
      {/* Button to toggle chat window */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-md"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? "Zavrieť chat" : "Napísať AI help botovi"}
        </button>
      </div>

      {/* Chat window (conditionally rendered) */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 shadow-lg rounded-lg p-4 z-50 bg-gray-400">
          <div className="chatbox max-h-60 overflow-y-auto text-[#2E3192]">
            {chatHistory.map((entry, index) => ( 
              <div key={index} className={`message ${entry.sender}`}>
                <strong>{entry.sender === "user" ? "You: " : "AI: "}</strong>
                {entry.message}
              </div>
            ))}
            {isLoading && <div className="loading">AI odpisuje..</div>}
          </div>

          <form onSubmit={handleSubmit} className="input-area mt-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Opýtaj sa ma čokoľvek..."
              className="w-full p-2 border rounded-md bg-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-2 rounded-md w-full"
              disabled={isLoading || !userInput.trim()}
            >
              Odoslať
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
