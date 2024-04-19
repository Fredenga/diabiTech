import React, { useState, useEffect } from "react";
import { FindText } from "./FindText";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const UseSpeechToText: React.FC = () => {
  const [glucoseValue, setGlucoseValue] = useState<string>("");
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognition | null>(null);
  let x = 5;
  const startSpeechRecognition = () => {
    if (speechRecognition) {
      speechRecognition.start();
    }
  };

  const speak = (message: string) => {
    if ("speechSynthesis" in window) {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
    } else {
      console.log("Speech synthesis not supported");
    }
  };
  useEffect(() => {
    const handleSpeechRecognitionResult = (event: SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript.trim();

      setGlucoseValue(spokenText);

      if (spokenText.includes(FindText[0])) {
        speak("Your blood glucose values are 180 milligrams per deciLitre");
      } else if (spokenText.includes(FindText[1])) {
        speak(
          "The forecast indicates that blood glucose predictions for the next 15 minutes will be 100 milligrams per deciLitre"
        );
      } else if (FindText[2]) {
        if (x === 5) {
          speak("Your blood glucose levels are above the normal levels");
        }
        speak("Your blood glucose levels are normal");
      }
    };

    const handleSpeechRecognitionError = (event: SpeechRecognitionError) => {
      console.error("Speech recognition error:", event.error);
    };

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = handleSpeechRecognitionResult;
    recognition.onerror = handleSpeechRecognitionError;
    setSpeechRecognition(recognition);
  }, []);

  return <button onClick={startSpeechRecognition}>Speak</button>;
};

export default UseSpeechToText;
