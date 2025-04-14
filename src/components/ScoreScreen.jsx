import React from "react";

const ScoreScreen = ({
  questions,
  userAnswers,
  onShowFeedback,
  showFeedback,
}) => {
  // Calculate total correct answers
  const correctCount = questions.reduce((acc, q, idx) => {
    const userAns = userAnswers[idx]?.selectedOptions || [];
    const correctAns = q.correctAnswer;
    const isCorrect =
      userAns.length === correctAns.length &&
      userAns.every((v, i) => v === correctAns[i]);
    return acc + (isCorrect ? 1 : 0);
  }, 0);

  return (
    <div className="relative max-w-4xl w-full mx-auto text-center rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm px-4 sm:px-8">
      {/* Dynamic gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/50 to-black/80 z-0"></div>

      {/* Optional background image with low opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/640318118/photo/sunset-over-indian-ocean.jpg?s=612x612&w=0&k=20&c=DLKuEcWW9YwwNid-3ypLu2AJ4uPC4aXoIzyFFjDHUmM=')",
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 py-10 sm:py-12 text-white">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse">
          Your Score
        </h2>

        {/* Circular progress score display */}
        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Outer background circle */}
              <circle
                className="text-gray-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              {/* Progress circle showing percentage */}
              <circle
                className="text-green-400"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${
                  (correctCount / questions.length) * 251
                } 251`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            {/* Score number in center */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl sm:text-3xl font-bold">
                {correctCount}
                <span className="text-lg sm:text-xl">/{questions.length}</span>
              </span>
              <span className="text-sm text-gray-300">correct answers</span>
            </div>
          </div>
        </div>

        {/* Button to toggle feedback answers */}
        {!showFeedback && (
          <button
            onClick={onShowFeedback}
            className="relative overflow-hidden group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10">Show Correct Answers</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </button>
        )}

        {/* Feedback section that shows after user clicks "Show Correct Answers" */}
        {showFeedback && (
          <div className="mt-10 space-y-6 animate-fadeIn">
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index]?.selectedOptions || [];
              return (
                <div
                  key={q.questionId}
                  className="bg-gray-900/50 backdrop-blur-sm p-5 sm:p-6 rounded-lg border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-200 text-left"
                >
                  {/* Question text with index number */}
                  <p className="font-bold text-base sm:text-lg mb-3 flex items-start">
                    <span className="bg-cyan-500/20 text-cyan-300 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    {q.question}
                  </p>

                  {/* Correct vs user's selected answer blocks */}
                  <div className="flex flex-wrap gap-2">
                    {q.correctAnswer.map((ans, i) => {
                      const isCorrect = userAnswer[i] === ans;
                      return (
                        <span
                          key={i}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                            isCorrect
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-red-500/20 text-red-200 border border-red-500/30"
                          }`}
                        >
                          {/* Colored indicator */}
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${
                              isCorrect ? "bg-green-400" : "bg-red-400"
                            }`}
                          ></span>
                          {/* Display selected and correct answers */}
                          <span>
                            <span className="font-bold">
                              {userAnswer[i] || "___"}
                            </span>
                            <span className="mx-1 text-gray-400">→</span>
                            <span className="font-semibold">{ans}</span>
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreScreen;
