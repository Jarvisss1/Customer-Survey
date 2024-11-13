import React, { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Survey from "./components/Survey";
import ThankYouScreen from "./components/ThankYouScreen";
import ConfirmationDialog from "./components/ConfirmationDialog";
import ViewResponses from "./components/ViewResponses";
import questionsData from "./assets/questions"; // Import questions from questions.js
import "./index.css";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [responses, setResponses] = useState({}); // Store responses here
  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  // Load questions and responses from local storage or fallback to questions.js
  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("surveyQuestions"));
    if (storedQuestions && storedQuestions.length > 0) {
      setQuestions(storedQuestions);
    } else {
      setQuestions(questionsData);
    }

    const storedSessionId = localStorage.getItem("sessionId");
    if (!storedSessionId) {
      // Generate a unique session ID if it doesn't exist
      const newSessionId = new Date().getTime();
      setSessionId(newSessionId);
      localStorage.setItem("sessionId", newSessionId);
    } else {
      setSessionId(storedSessionId);
    }

    // Load responses from local storage if available
    const storedResponses =
      JSON.parse(localStorage.getItem("surveyData")) || [];
    const currentSessionResponses = storedResponses.find(
      (response) => response.sessionId === storedSessionId
    );
    if (currentSessionResponses) {
      setResponses(currentSessionResponses.responses);
    }
  }, [sessionId]);

  const handleStart = () => setScreen("survey");

  const handleSubmit = (surveyResponses) => {
    setResponses(surveyResponses);
    setShowConfirmation(true);
  };

  // Function to store responses into local storage
  const saveResponseToLocalStorage = (sessionId, surveyResponses) => {
    const storedResponses =
      JSON.parse(localStorage.getItem("surveyData")) || [];
    const newResponse = {
      sessionId,
      responses: surveyResponses,
      status: "COMPLETED",
    };
    storedResponses.push(newResponse);
    localStorage.setItem("surveyData", JSON.stringify(storedResponses));
  };

  const confirmSubmit = () => {
    saveResponseToLocalStorage(sessionId, responses);
    setScreen("thankyou");
    setShowConfirmation(false);
    // Clear responses from state after submission
    setResponses({});
  };

  const viewResponses = () => setScreen("viewResponses");

  const goBackToSurvey = () => setScreen("survey");

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {screen === "survey" && (
        <Survey
          questions={questions}
          onSubmit={handleSubmit}
          responses={responses}
        />
      )}
      {screen === "thankyou" && <ThankYouScreen />}
      {showConfirmation && (
        <ConfirmationDialog
          onConfirm={confirmSubmit}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {screen === "viewResponses" && (
        <ViewResponses responses={responses} questions={questions} />
      )}

      <button
        onClick={screen === "viewResponses" ? goBackToSurvey : viewResponses}
        className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {screen === "viewResponses" ? "Go Back to Survey" : "View Responses"}
      </button>
    </div>
  );
}

export default App;
