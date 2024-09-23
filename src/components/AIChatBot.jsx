"use client"; // Ensure this component runs on the client side

import React, { useState } from "react";

const AIChatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="chatbot-container">
      <div className="chatbox">
        {chatHistory.map((entry, index) => (
          <div key={index} className={`message ${entry.sender}`}>
            <strong>{entry.sender === "user" ? "You: " : "AI: "}</strong>
            {entry.message}
          </div>
        ))}
        {isLoading && <div className="loading">AI is typing...</div>}
      </div>

      <form onSubmit={handleSubmit} className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !userInput.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChatbot;
