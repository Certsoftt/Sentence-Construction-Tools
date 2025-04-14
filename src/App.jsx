import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import ScoreScreen from "./components/ScoreScreen";
import questionData from "./data/questionData";

const App = () => {
  const [screen, setScreen] = useState("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = questionData.data.questions;

  // Start quiz from start screen
  const handleStart = () => {
    setScreen("quiz");
  };

  // Handle answer submission and navigate to next question or score screen
  const handleAnswerSubmit = (userAnswer) => {
    setUserAnswers([...userAnswers, userAnswer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setScreen("score");
    }
  };

  // Show feedback after quiz is completed
  const handleShowFeedback = () => {
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 relative overflow-hidden">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10 animate-pulse"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing orb decorations */}
      <div className="fixed -right-32 -top-32 w-64 h-64 rounded-full bg-purple-600 opacity-20 blur-3xl" />
      <div className="fixed -left-32 -bottom-32 w-64 h-64 rounded-full bg-pink-600 opacity-20 blur-3xl" />

      {/* Main content area with glass morphism and responsive layout */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 backdrop-blur-sm">
        <div className="w-full max-w-4xl mx-auto">
          {/* Start screen */}
          {screen === "start" && <StartScreen onStart={handleStart} />}

          {/* Quiz screen with question display */}
          {screen === "quiz" && (
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 overflow-hidden text-white p-4 sm:p-6">
              <QuizScreen
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onSubmit={handleAnswerSubmit}
              />
            </div>
          )}

          {/* Score screen shown after quiz ends */}
          {screen === "score" && (
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 overflow-hidden text-white p-4 sm:p-6">
              <ScoreScreen
                questions={questions}
                userAnswers={userAnswers}
                onShowFeedback={handleShowFeedback}
                showFeedback={showFeedback}
              />
            </div>
          )}

          {/* Final result/feedback screen */}
          {screen === "result" && (
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl shadow-purple-500/20 border border-purple-500/30 overflow-hidden text-white p-4 sm:p-6">
              <ResultScreen questions={questions} userAnswers={userAnswers} />
            </div>
          )}
        </div>
      </div>

      {/* Floating particle animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-5"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
