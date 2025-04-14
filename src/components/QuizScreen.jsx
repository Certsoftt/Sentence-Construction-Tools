import React, { useEffect, useState } from "react";

const QuizScreen = ({ question, questionIndex, totalQuestions, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filledBlanks, setFilledBlanks] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);

  // Countdown timer with auto-submit on timeout
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer); // Clear timer on unmount or question change
  }, [questionIndex]);

  // Reset states when moving to a new question
  useEffect(() => {
    setSelectedOptions([]);
    setFilledBlanks(["", "", "", ""]);
    setTimeLeft(30);
  }, [questionIndex]);

  // Handle user selecting an option
  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option) || selectedOptions.length >= 4) return;

    const updated = [...selectedOptions, option];
    setSelectedOptions(updated);

    const newBlanks = [...filledBlanks];
    newBlanks[updated.length - 1] = option;
    setFilledBlanks(newBlanks);
  };

  // Clear selected options and reset blanks
  const handleClear = () => {
    setSelectedOptions([]);
    setFilledBlanks(["", "", "", ""]);
  };

  // Final submission handler
  const handleSubmit = () => {
    onSubmit({
      questionId: question.questionId,
      selectedOptions,
    });
  };

  // Determine timer color dynamically
  const getTimerColor = () => {
    if (timeLeft > 20) return "text-green-500";
    if (timeLeft > 10) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white/80 shadow-md rounded-lg">
      {/* Header with question number */}
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
        Question {questionIndex + 1} of {totalQuestions}
      </h2>

      {/* Fill-in-the-blank sentence display */}
      <p className="text-base sm:text-lg mb-6 text-gray-900">
        {question.question.split("_____________").map((part, index) => (
          <span key={index}>
            {part}
            {index < 4 && (
              <span className="inline-block min-w-[80px] px-3 py-1 mx-1 rounded-md text-blue-600 font-semibold   text-center">
                {filledBlanks[index] || "________"}
              </span>
            )}
          </span>
        ))}
      </p>

      {/* Options Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOptions.includes(option)}
            className={`py-2 px-4 rounded-lg text-sm font-semibold transition duration-200
              ${
                selectedOptions.includes(option)
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-100 text-gray-900 hover:bg-blue-600 hover:text-white shadow"
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Bottom section: Timer, Clear, and Submit buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Timer with dynamic color */}
        <div className={`text-lg font-semibold ${getTimerColor()}`}>
          ⏳Time Left: {timeLeft}
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-medium transition"
        >
          Clear
        </button>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
