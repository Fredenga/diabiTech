import React, { useState, useEffect, useContext } from "react";
import { FindText } from "./FindText";
import { DataContext, GlucoseData } from "../context/dataContext";
import { lastVal } from "../components/Predictions/Predictions";
import { dayMinMax } from "../components/DataTable/DataTable";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const UseSpeechToText: React.FC = () => {
  const [glucoseValue, setGlucoseValue] = useState<string>("");
  const { data } = useContext(DataContext);
  const recent: GlucoseData =
    data.length > 0
      ? data[data.length - 1]
      : { entry_id: 0, glucoseData: { bg_value: 0, timestamp: "" } };

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
        speak(
          `Your blood glucose values are ${recent.glucoseData.bg_value}milligrams per deciLitre`
        );
      } else if (spokenText.includes(FindText[1])) {
        speak(
          `The forecast indicates that blood glucose predictions for the next 15 minutes will be ${Math.round(
            lastVal
          )} milligrams per deciLitre`
        );
      } else if (spokenText.includes(FindText[2])) {
        if (
          recent.glucoseData.bg_value < 80 ||
          recent.glucoseData.bg_value > 180
        ) {
          speak("Your blood glucose level is above the normal levels");
        } else {
          speak("Your blood glucose level is normal");
        }
      } else if (spokenText.includes("Explain the system")) {
        speak(`DiabiTech is a system that measures your blood glucose values through non-invasive methods. To begin using the system:
        Step 1. Place your finger between the two infrared sensors on the blood glucose measuring component
        Step 2. View the display monitor to read your current blood glucose level.
        Step 3. Login to Diabitech system with your email and password.
        Step 4. View your blood glucose values on the chart labelled "Blood glucose Values" which is green if your values are normal or red if they are at abnormal levels
        Step 5. View predicted values on the Forecast chart. The last value signifies the forecasted value 15 minutes from the last measurement.
        Step 6. On the data Page you can find statistical information about each day which you can print or save as an external document for future reference.
        `);
      } else if (spokenText.includes("What is variability")) {
        speak(`Variability also known as standard deviation measures how spread out your blood sugar readings are from the average/mean value of the day.
        A low standard deviation indicates that your blood sugar levels are relatively stable and don't fluctuate much throughout the day. This is generally considered desirable for good diabetic control.
        A high standard deviation suggests significant swings in your blood sugar levels. This can be caused by various factors like diet, exercise, medication, or underlying health conditions
        `);
      } else if (spokenText.includes("What is mean value")) {
        speak(
          "Mean value signifies the average of all blood glucose values of the day"
        );
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
