import React, { useEffect, useState } from "react";
import "./App.css";
import { sampleText } from "./sampleText.js";
import generateParagraphs from "./MarkovsChain";

function App() {
  const [inputText, setInputText] = useState(generateParagraphs(sampleText, 3));

  return (
    <div className="App">
      <p style={{ whiteSpace: "pre-line" }}>{inputText}</p>
    </div>
  );
}

export default App;
