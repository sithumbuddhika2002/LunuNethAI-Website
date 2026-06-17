import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  options?: string[];
}

export default function AgriBotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm AgriBot, your LunuNeth AI crop advisor. Select a query below, or type your crop concern to begin.",
      options: [
        "Leaf disease diagnosis help",
        "How to control Thrips pests?",
        "How does disease forecasting work?"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerBotResponse = (userText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      let options: string[] = [];

      if (userText.toLowerCase().includes('disease') || userText.toLowerCase().includes('leaf') || userText.toLowerCase().includes('diagnosis')) {
        reply = "I can help diagnose leaf issues! LunuNeth AI has a specialized Classifier that uses deep learning (TFLite models) to detect Purple Blotch and Leaf Twist Disease (LTD). Would you like to know how to take a proper diagnostic photo?";
        options = ["Yes, show photo guidelines", "No, show other options"];
      } else if (userText.toLowerCase().includes('thrips') || userText.toLowerCase().includes('control') || userText.toLowerCase().includes('pest')) {
        reply = "For Thrips pest control: LunuNeth AI uses PyTorch Faster R-CNN object detection to spot pests early. I suggest installing blue or yellow sticky traps. For biological control, encourage predatory thrips or pirate bugs. Chemically, apply Neem formulations or Spinosad.";
        options = ["Main Menu", "Ask another question"];
      } else if (userText.toLowerCase().includes('forecasting') || userText.toLowerCase().includes('st-gnn') || userText.toLowerCase().includes('work')) {
        reply = "Our forecasting system uses a Spatio-Temporal Graph Neural Network (ST-GNN). It models farms as nodes in a graph, analyzing local humidity, wind direction, temperature, and neighbor reports to predict disease probabilities for the coming 14 days.";
        options = ["Check forecasting metrics", "Main Menu"];
      } else if (userText.toLowerCase().includes('photo') || userText.toLowerCase().includes('guideline')) {
        reply = "For the best diagnosis: 1. Take the photo in bright, natural daylight. 2. Capture a close-up of a single affected leaf. 3. Avoid shadows or hands covering the leaf. Our TFLite model runs directly on your mobile device for offline support!";
        options = ["Main Menu"];
      } else {
        reply = "I understand. I am constantly training on agronomic datasets to offer specific crop advisory. Please try selecting one of our main options below or download our app for a full diagnostic scan.";
        options = ["Leaf disease diagnosis help", "How to control Thrips pests?", "How does disease forecasting work?"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: reply,
          options: options.length > 0 ? options : undefined
        }
      ]);
    }, 1200);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: 'user', text }
    ]);
    setInputText('');

    triggerBotResponse(text);
  };

  return (
    <div className="glass-card agribot-chat-card">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="bot-avatar flex-center">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <div className="chat-header-title">AgriBot Assistant</div>
          <div className="chat-header-subtitle">
            <span></span> BERT Diagnostic Engine Online
          </div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="chat-body">
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            <div className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>

            {/* Render interactive suggestions if available on the latest bot message */}
            {msg.sender === 'bot' && msg.options && msg.id === messages[messages.length - 1].id && !isTyping && (
              <div className="chat-interactive-options" style={{ alignSelf: 'flex-start', maxWidth: '90%' }}>
                {msg.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(opt)}
                    className="chat-option-btn"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Typing bubble */}
        {isTyping && (
          <div className="chat-typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Form Footer */}
      <form
        className="chat-footer"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AgriBot about crop issues..."
          className="chat-input"
          disabled={isTyping}
        />
        <button type="submit" className="chat-send-btn flex-center" disabled={isTyping || !inputText.trim()}>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
