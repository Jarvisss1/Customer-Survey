import React from "react";

function ViewResponses({ responses, questions }) {
  console.log(responses);
  
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">Survey Responses</h2>

      {questions.map((question) => {
        const response = responses[question.id];
        return (
          <div key={question.id} className="mb-4">
            <p className="font-medium text-left">{question.text}</p>
            <div className="text-left">
              {response === null ? "No response" : response}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewResponses;
