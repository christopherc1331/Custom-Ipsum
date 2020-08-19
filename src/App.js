import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { sampleText } from "./sampleText.js";
import "./App.css";
import generateParagraphs from "./MarkovsChain";

function App() {
  const [inputText, setInputText] = useState(generateParagraphs(sampleText, 3));

  return (
    <Container>
      <Paragraphs>{inputText}</Paragraphs>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
`;

const Paragraphs = styled.p`
  white-space: pre-line;
`;

export default App;
