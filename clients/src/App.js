/*import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        sendMessage(transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const handleSpeak = () => {
    recognitionRef.current?.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synthRef.current.speak(utterance);
  };

  const sendMessage = async (userMsg) => {
    const newChat = [...chat, { type: "user", content: userMsg }];
    setChat(newChat);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      const aiMsg = data.reply;
      speak(aiMsg);
      setChat([...newChat, { type: "bot", content: aiMsg }]);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <h1>AI Virtual Assistant</h1>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`msg ${msg.type}`}>{msg.content}</div>
        ))}
      </div>
      <div className="controls">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={() => sendMessage(message)}>Send</button>
        <button onClick={handleSpeak}><i className="fas fa-microphone"></i></button>
      </div>
    </div>
  );
};

export default App;*/

import { useState } from "react";
import "./styles.css";


function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.response);
      } else {
        setResponse("❌ Error: " + data.error);
      }
    } catch (err) {
      setResponse("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      
      <h1 className="title">🧠AI Assistant</h1>

      <div className="chat-box">
        <textarea
          className="input-area"
          placeholder="Ask something like: What's the capital of France?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      <div className="response-area">
        <strong>Response:</strong>
        <p>{response || "No response yet."}</p>
      </div>
    </div>
  );
}

export default App;
