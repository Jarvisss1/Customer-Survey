  import React, { useState, useEffect } from "react";
  import WelcomeScreen from "./components/WelcomeScreen";
  import Survey from "./components/Survey";
  import ThankYouScreen from "./components/ThankYouScreen";
  import ConfirmationDialog from "./components/ConfirmationDialog";
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
      const storedQuestions = JSON.parse(
        localStorage.getItem("surveyQuestions")
      );
      if (storedQuestions && storedQuestions.length > 0) {
        setQuestions(storedQuestions);
      } else {
        setQuestions(questionsData);
      }

      const storedSessionId = localStorage.getItem("sessionId");
      if (!storedSessionId) {
        const newSessionId = new Date().getTime();
        setSessionId(newSessionId);
        localStorage.setItem("sessionId", newSessionId);
      } else {
        setSessionId(storedSessionId);
      }

      const storedResponses =
        JSON.parse(localStorage.getItem("surveyData")) || [];
      const currentSessionResponses = storedResponses.find(
        (response) => response.sessionId === storedSessionId
      );
      if (currentSessionResponses) {
        setResponses(currentSessionResponses.responses);
        console.log(
          "Loaded responses from localStorage:",
          currentSessionResponses.responses
        );
      }
    }, [sessionId]);

    const handleStart = () => setScreen("survey");

    const handleSubmit = (surveyResponses) => {
      setResponses(surveyResponses);
      setShowConfirmation(true);
    };

    const confirmSubmit = () => {
      // Save the responses to local storage
      const storedResponses =
        JSON.parse(localStorage.getItem("surveyData")) || [];
      const newResponse = {
        sessionId,
        responses,
        status: "COMPLETED",
      };
      storedResponses.push(newResponse);
      localStorage.setItem("surveyData", JSON.stringify(storedResponses));
      setScreen("thankyou");
      setShowConfirmation(false);
      setResponses({});
    };

    return (
      <div className="h-screen flex items-center justify-center bg-[#020817]">
        {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}
        {screen === "survey" && (
          <Survey
            questions={questions}
            onSubmit={handleSubmit}
            responses={responses}
            sessionId={sessionId}
          />
        )}
        {screen === "thankyou" && <ThankYouScreen />}
        {showConfirmation && (
          <ConfirmationDialog
            onConfirm={confirmSubmit}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
    );
  }

  export default App;

