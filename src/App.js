import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { sampleText } from "./sampleText.js";
import "./App.css";
import generateParagraphs from "./MarkovsChain";

function App() {
  const [inputText, setInputText] = useState(generateParagraphs(sampleText, 3));

  return (
    <Container>
      <HeaderContainer>
        <h1>Custom Ipsum</h1>
        <h3>Create gibberish that makes sense to you!</h3>
      </HeaderContainer>
      <BodyContainer>
        <Paragraphs>{inputText}</Paragraphs>
      </BodyContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  max-height: 100vh;
  overflow-y: hidden;
`;

const HeaderContainer = styled.div`
  width: 100%;
  min-height: 3rem;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  background-color: #414972;
  h1,
  h3 {
    color: #a2ace8;
  }
`;

const BodyContainer = styled.div`
  padding: 0 1.5rem;
`;

const Paragraphs = styled.p`
  white-space: pre-line;
  color: #735d4e;
`;

export default App;
