import React from "react";

const ResultScreen = ({ questions, userAnswers }) => {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white/80 rounded-md shadow-md">
      {/* Header Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
        Quiz Feedback
      </h2>

      {/* Loop through each question */}
      {questions.map((q, index) => {
        const userAnswer = userAnswers[index]?.selectedOptions || [];

        return (
          <div
            key={q.questionId}
            className="mb-6 sm:mb-8 border-b border-gray-300 pb-4"
          >
            {/* Display question */}
            <p className="font-semibold mb-2 text-base sm:text-lg text-gray-700">
              Q{index + 1}: {q.question}
            </p>

            {/* Display user's answer vs correct answers */}
            <div className="flex flex-wrap gap-3">
              {q.correctAnswer.map((ans, i) => {
                const isCorrect = userAnswer[i] === ans;

                return (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm sm:text-base font-medium text-white 
                      ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {userAnswer[i] || "____"} (Correct: {ans})
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultScreen;
