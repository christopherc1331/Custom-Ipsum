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
        <Top>
          <h1>Custom Ipsum</h1>
          <h3>Create gibberish that makes sense to you!</h3>
        </Top>
        <Bottom />
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
  min-height: 9rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h1,
  h3 {
    color: #6fb4b3;
  }
`;

const Top = styled.div`
  width: inherit;
  min-height: 7.5rem;
  padding: 0.75rem 0 0 1.5rem;
  background-color: #4b4b4c;
`;
const Bottom = styled.div`
  width: inherit;
  min-height: 1.5rem;
  background-color: #595958;
`;
const BodyContainer = styled.div`
  padding: 0 1.5rem;
`;

const Paragraphs = styled.p`
  white-space: pre-line;
`;

export default App;
