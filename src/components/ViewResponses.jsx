import React from "react";

function ViewResponses({ responses, questions, onClose }) {
  // Create a new array for questions with non-null responses
  const answeredQuestions = questions.filter(
    (question) => responses[question.id] !== null && responses[question.id] !== "" && responses[question.id] !== undefined
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto text-left relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-800"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Survey Responses</h2>

        {/* Display only questions with non-null responses */}
        {answeredQuestions.length === 0 ? (
          <p className="text-gray-500">No responses yet.</p>
        ) : (
          answeredQuestions.map((question) => {
            const response = responses[question.id];
            return (
              <div key={question.id} className="mb-4 flex justify-between">
                {/* Question on the left */}
                <p className="font-medium text-left w-1/2">{question.text}</p>

                {/* Response on the right */}
                <div className="text-left w-1/2">
                  <span
                    className={`${
                      response === null ? "text-gray-500" : "text-blue-600"
                    } font-semibold`}
                  >
                    {response === null ? "No response" : response}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ViewResponses;
