import { dayMinMax } from "../components/DataTable/DataTable";
import { GlucoseData } from "../context/dataContext";
import { day_val } from "../components/Stats/Stats";
const speak = (message: string) => {
  if ("speechSynthesis" in window) {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported");
  }
};

export default function wordSet(
  spokenText: string,
  FindText: string[],
  recent: GlucoseData
) {
  switch (true) {
    case spokenText.includes(FindText[0]):
      speak(
        `Your blood glucose values are ${recent.glucoseData.bg_value} milligrams per deciLitre`
      );
      break;
    case spokenText.includes(FindText[1]):
      speak(
        "The forecast indicates that blood glucose predictions for the next 15 minutes will be 100 milligrams per deciLitre"
      );
      break;
    case spokenText.includes(FindText[2]):
      if (
        recent.glucoseData.bg_value < 80 ||
        recent.glucoseData.bg_value > 180
      ) {
        speak("Your blood glucose levels are above the normal levels");
      } else {
        speak("Your blood glucose levels are normal");
      }
      break;
    case spokenText.includes(FindText[3]):
      speak(`Today's Maximum blood glucose value is ${dayMinMax.max}mg/dL`);
      break;
    case spokenText.includes(FindText[4]):
      speak(`Today's Minimum blood glucose value is ${dayMinMax.min}mg/dL`);
      break;
    case spokenText.includes(FindText[5]):
      speak(`Today's Minimum blood glucose value is ${dayMinMax.min}mg/dL`);
      break;
    case spokenText.includes(FindText[6]):
      speak(
        `The average change in blood glucose value is ${day_val.std_dev}mg/dL`
      );
      break;
    case spokenText.includes(FindText[8]):
      speak(
        `Blood glucose thresholds are specific blood sugar levels that indicate different states in your body's management of glucose. the specific thresholds may vary depending on individual factors such as age, pregnancy, and certain medical conditions. It's always best to consult with your doctor to determine the appropriate blood sugar targets for you`
      );
      break;
    case spokenText.includes(FindText[9]):
      speak(
        `To begin using the system:
        1. Place your finger between the two infrared sensors on the blood glucose measuring component
        2. View the display monitor to read your current blood glucose level monitor
        3. Login to Diabitech system with your email and password.
        4. View your blood glucose values on the chart labelled "Blood glucose Values" which is green if your values are normal or red if they are at abnormal levels
        5. View predicted values on the Forecast chart. The last value signifies the forecasted value 15 minutes from the last measurements.
        6. On the data Page you can find statistical information about each day.
        `
      );
      break;

    default:
      // Handle cases where none of the keywords are found
      console.log("No matching keywords found in spoken text."); // Or provide alternative feedback
  }
}
