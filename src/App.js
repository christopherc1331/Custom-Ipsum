import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { sampleText } from "./sampleText.js";
import generateParagraphs from "./MarkovsChain";

function App() {
  const [paraCount, setParaCount] = useState(3);
  const [inputText, setInputText] = useState(
    generateParagraphs(sampleText, paraCount)
  );

  return (
    <Container>
      <HeaderContainer>
        <Top>
          <h1>Custom Ipsum</h1>
          <TextLoop>
            <h3>Your new favorite text filler!</h3>
            <h3>Create gibberish that makes sense to you!</h3>
          </TextLoop>
        </Top>
        <Bottom />
      </HeaderContainer>
      <BodyContainer>
        <Controls>
          <ParaControlContainer>
            <CaretContainer>
              <CaretUpOutlined />
              <CaretDownOutlined />
            </CaretContainer>
            <h2>{`Number of paragraphs:  ${paraCount}`}</h2>
          </ParaControlContainer>
        </Controls>
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

const Controls = styled.div`
  width: 45%;
  height: 70vh;
  padding-top: 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ParaControlContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
`;

const CaretContainer = styled.div`
  display: flex;
  flex-direction: column;
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
