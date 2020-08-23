import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { sampleText } from "./sampleText.js";
import generateParagraphs from "./MarkovsChain";
import { Button } from "antd";

function App() {
  const [paraCount, setParaCount] = useState(3);
  const [displayText, setDisplayText] = useState(
    generateParagraphs(sampleText, paraCount)
  );
  const [oldText, setOldText] = useState(displayText);
  const [copyText, setCopyText] = useState("Copy");
  const getParagraph = () => {
    setDisplayText(generateParagraphs(sampleText, paraCount));
  };

  const copyCurrentText = () => {
    setCopyText("Copied To Clipboard!");
    setTimeout(() => {
      setCopyText("Copy");
    }, 3000);
    const el = document.createElement("textarea");
    el.value = displayText;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

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
              <CaretUpOutlined
                onClick={() => setParaCount(paraCount + 1)}
                style={{ fontSize: "30px" }}
              />
              <CaretDownOutlined
                onClick={() => setParaCount(paraCount - 1)}
                style={{ fontSize: "30px" }}
              />
            </CaretContainer>
            <h2>{`Number of paragraphs:  ${paraCount}`}</h2>
          </ParaControlContainer>
          <Button type="Primary" onClick={() => getParagraph(displayText)}>
            Generate Another Paragraph
          </Button>
        </Controls>
        <Right>
          <CopyContainer onClick={() => copyCurrentText()}>
            <CopyOutlined style={{ fontSize: "30px" }} />
            <h4>{copyText}</h4>
          </CopyContainer>
          <ParagraphContainer>
            <Paragraphs>{displayText}</Paragraphs>
          </ParagraphContainer>
        </Right>
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
  width: 35%;
  height: 70vh;
  padding-top: 1rem;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    background-color: #4b4b4c;
    color: #f6f4ec;
    border: solid 1px #4b4b4c;
  }
`;

const ParaControlContainer = styled.div`
  width: 80%;
  display: flex;
  margin-bottom: 4rem;
  justify-content: space-around;
  align-items: center;
`;

const CaretContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  width: 55%;
`;

const CopyContainer = styled.div`
  margin-bottom: 0.3rem;
  height: 8%;
  width: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    transition: color 0.5s ease;
    color: transparent;
  }
  :hover {
    h4 {
      color: black;
    }
  }
`;

const ParagraphContainer = styled.div`
  height: 80%;
  padding: 1.25rem;
  margin-right: 5rem;
  overflow: hidden;
  border: solid 3px #737373;
  border-radius: 3px;
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
