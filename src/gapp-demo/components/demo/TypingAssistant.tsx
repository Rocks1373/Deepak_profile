import React, { useEffect, useState } from "react";

interface TypingAssistantProps {
  message: string;
  onComplete?: () => void;
}

export function TypingAssistant({ message, onComplete }: TypingAssistantProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        onComplete?.();
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, [message, onComplete]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-600">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 leading-relaxed">
            {displayedText}
            {!isComplete && <span className="inline-block w-1 h-4 bg-blue-600 ml-1 animate-pulse" />}
          </p>
        </div>
      </div>
    </div>
  );
}
