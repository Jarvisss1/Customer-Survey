import React, { useEffect } from "react";

function ThankYouScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" bg-blue-200 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Thank you for your feedback!</h1>
      <p className="mt-4">Redirecting to the welcome screen...</p>
    </div>
  );
}

export default ThankYouScreen;
