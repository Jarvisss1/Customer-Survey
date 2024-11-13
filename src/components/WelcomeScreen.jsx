import React from "react";

function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-evenly w-96 h-72 p-8 bg-blue-200 shadow-xl rounded-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-black">
        Your Opinion Matters! <br /> Take Our Quick Survey
      </h1>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={onStart}
      >
        Get Started
      </button>
    </div>
  );
}

export default WelcomeScreen;
