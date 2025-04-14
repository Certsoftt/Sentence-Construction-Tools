import React from "react";

const StartScreen = ({ onStart }) => {
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center bg-cover bg-center text-white relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2020/07/28/11/43/circles-5444818_1280.png')",
      }}
    >
      {/* Floating bubbles for animated background effect */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500 opacity-10 animate-pulse"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content container with text and button */}
      <div
        className="relative z-10 bg-black bg-opacity-80 p-6 sm:p-10 rounded-2xl text-center max-w-[90%] sm:max-w-xl
        border border-purple-500/30 backdrop-blur-md
        transition-all duration-500 hover:scale-[1.02]
        shadow-lg hover:shadow-xl hover:shadow-purple-500/30
        motion-safe:animate-[fadeIn_1s_ease-in-out]"
      >
        {/* Heading Title */}
        <h1
          className="text-3xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text 
        bg-gradient-to-r from-purple-400 to-pink-300
        hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] transition-all duration-300"
        >
          Sentence Construction Tools
        </h1>

        {/* Game instructions */}
        <div className="space-y-4 mb-8 text-sm sm:text-lg text-gray-200">
          <p className="motion-safe:animate-[slideIn_0.8s_ease-in-out]">
            <span className="inline-block hover:scale-110 transition-transform duration-300 mr-2">
              🎯
            </span>
            Get ready to test your sentence-building skills!
          </p>
          <p className="motion-safe:animate-[slideIn_0.8s_ease-in-out_0.2s]">
            <span className="inline-block hover:rotate-12 transition-transform duration-300 mr-2">
              ✏️
            </span>
            Select the correct words in sequence to complete each sentence.
          </p>
          <p className="motion-safe:animate-[slideIn_0.8s_ease-in-out_0.4s]">
            <span className="inline-block hover:scale-125 transition-transform duration-300 mr-2">
              ⏳
            </span>
            You have{" "}
            <span className="font-bold text-purple-300">30 seconds</span> per
            question.
          </p>
        </div>

        {/* Start Quiz Button */}
        <button
          onClick={onStart}
          className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500
          hover:from-purple-700 hover:to-pink-600
          px-8 sm:px-10 py-3 sm:py-4 rounded-full text-white text-base sm:text-lg font-semibold
          transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/40
          hover:-translate-y-1 active:translate-y-0 group animate-bounce"
        >
          {/* Hover overlay */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>

          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            Start Quiz
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
