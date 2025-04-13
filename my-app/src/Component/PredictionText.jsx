import React, { useEffect, useState } from "react";

const TypingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // reset on text change
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval); // cleanup
  }, [text]); // watch for text change

  return (
    <p className="text-yellow-100 text-sm leading-relaxed whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse text-yellow-400">|</span>
    </p>
  );
};

const PredictionText = ({ text }) => {
  if (!text) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        marginBottom: "1.5rem",
        backgroundColor: "rgba(255, 255, 0, 0.05)",
        borderRadius: "0.75rem",
      }}
    >
      <TypingText text={text} />
    </div>
  );
};

export default PredictionText;
