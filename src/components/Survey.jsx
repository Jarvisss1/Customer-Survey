import React, { useState } from "react";
import ViewResponses from "./ViewResponses"; // Import the ViewResponses component

function Survey({ questions, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [viewResponsesMode, setViewResponsesMode] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (answer) => {
    // If the selected answer is already chosen, unselect it by setting it to null
    const updatedResponses = {
      ...responses,
      [currentQuestion.id]:
        responses[currentQuestion.id] === answer ? null : answer,
    };
    setResponses(updatedResponses);
  };

  const handleSkip = () => {
    setResponses({ ...responses, [currentQuestion.id]: null });
    nextQuestion();
  };

  const nextQuestion = () =>
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const previousQuestion = () =>
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));

  const renderRatingButtons = () => {
    const buttons = Array.from({ length: currentQuestion.scale }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => handleAnswerChange(i + 1)}
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mx-1 ${
          responses[currentQuestion.id] === i + 1
            ? "bg-red-500 text-white"
            : "bg-white text-black border-gray-400"
        } hover:bg-red-200 hover:text-white`}
      >
        {i + 1}
      </button>
    ));

    if (currentQuestion.scale > 9) {
      return (
        <>
          <div className="flex justify-center mb-2">{buttons.slice(0, 5)}</div>
          <div className="flex justify-center">{buttons.slice(5)}</div>
        </>
      );
    }
    return <div className="flex justify-center">{buttons}</div>;
  };

  const handleSubmit = () => {
    console.log("Final Responses: ", responses);
    onSubmit(responses);
  };

  // Toggle between survey mode and view responses mode
  const handleViewResponses = () => {
    setViewResponsesMode(true);
  };

  const handleGoBackToSurvey = () => {
    setViewResponsesMode(false);
  };

  return (
    <div className="bg-blue-200 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">Customer Survey</h2>
      <div className="text-gray-700 font-semibold mb-4 text-right mr-3">
        {currentQuestionIndex + 1} / {questions.length}
      </div>

      {!viewResponsesMode ? (
        <>
          <div className="text-left mb-4">
            <p className="font-medium">
              {currentQuestionIndex + 1}. {currentQuestion.text}
            </p>
          </div>

          {currentQuestion.type === "rating" && (
            <div>{renderRatingButtons()}</div>
          )}

          {currentQuestion.type === "text" && (
            <textarea
              className="w-full border border-gray-300 p-2 rounded mt-4"
              onChange={(e) => handleAnswerChange(e.target.value)}
              value={responses[currentQuestion.id] || ""}
              rows="3"
            />
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={previousQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-blue-700"
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
            <button
              onClick={handleSkip}
              className="bg-yellow-500 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-yellow-600"
            >
              Skip
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="bg-pink-500 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-pink-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <ViewResponses
          responses={responses}
          questions={questions}
          onClose={handleGoBackToSurvey} // Close modal and go back to survey
        />
      )}

      {/* View Responses Button - positioned at bottom-right */}
      {!viewResponsesMode && (
        <button
          onClick={handleViewResponses}
          className="absolute bottom-8 right-8 bg-gray-500 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-gray-600"
        >
          View Responses
        </button>
      )}
    </div>
  );
}

export default Survey;
