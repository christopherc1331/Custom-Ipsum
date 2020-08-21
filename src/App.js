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
        <ParagraphContainer>
          <Paragraphs>{inputText}</Paragraphs>
        </ParagraphContainer>
      </BodyContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
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
    color: #f6f4ec;
  }
  h1 {
    font-size: 2.5rem;
    font-family: Impact, Charcoal, "Arial Narrow Bold", sans-serif;
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
  display: flex;
  justify-content: flex-end;
`;

const ParagraphContainer = styled.div`
  height: 70vh;
  width: 55%;
  padding: 1.25rem;
  margin-right: 5rem;
  overflow: hidden;
  border: solid 3px #737373;
  box-shadow: 8px 10px #4b4b4c;
  background-color: #f6f7ed;
`;

const Paragraphs = styled.p`
  white-space: pre-line;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
