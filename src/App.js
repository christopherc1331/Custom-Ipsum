import React, { useEffect, useState } from "react";
import "./App.css";
import { sampleText } from "./sampleText.js";
import generateSentences from "./MarkovsChain";

function App() {
  const [inputText, setInputText] = useState(generateSentences(sampleText, 2));

  return (
    <div className="App">
      <p>{inputText}</p>
    </div>
  );
}

export default App;
