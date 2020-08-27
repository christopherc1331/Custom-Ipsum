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
import { toshiba } from "./toshiba.js";
import { zenOfPython } from "./zenOfPython.js";
import { romeoAndJuliet } from "./romeoAndJuliet.js";
import { harryPotter } from "./harryPotter.js";
import generateParagraphs from "./MarkovsChain";
import { Button } from "antd";
import Select from "react-select";

function App() {
  const [paraCount, setParaCount] = useState(3);
  const [displayText, setDisplayText] = useState(
    generateParagraphs(toshiba, paraCount)
  );
  // const [oldText, setOldText] = useState(displayText);
  const [copyText, setCopyText] = useState("Copy");
  const getParagraph = (inputText) => {
    setDisplayText(generateParagraphs(inputText, paraCount));
  };

  const [choice, setChoice] = useState("");

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

  const options = [
    { value: zenOfPython, label: "Zen Of Python (Tim Peters)" },
    {
      value: harryPotter,
      label: "Harry Potter and the Sorcerer's Stone (JK Rowling)",
    },
    { value: toshiba, label: "TV - Operating Instructions (Toshiba)" },
    {
      value: romeoAndJuliet,
      label: "The Tragedy of Romeo and Juliet (Shakespeare) ",
    },
    {
      value: "TESTING",
      label: "Custom Text (Your Choice!) ",
    },
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: "#f6f7ed",
      color: "#282626",
    }),
    container: (provided) => ({
      ...provided,
      backgroundColor: "#f6f7ed",
      color: "#282626",
      width: "58%",
    }),
  };

  const changeHandler = (value) => {
    setChoice(value.value);
    setDisplayText(generateParagraphs(value.value, paraCount));
    return value.value;
  };

  console.log("Choice", choice);
  console.log("displayText", displayText);

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
            <h2>
              Number of paragraphs:
              <span>{`   ${paraCount}`}</span>
            </h2>
          </ParaControlContainer>
          <Button type="Primary" onClick={() => getParagraph(displayText)}>
            {`Generate ${
              paraCount > 1 ? "More Paragraphs" : "Another Paragraph"
            }`}
          </Button>
          <SelectContainer>
            <Select
              styles={customStyles}
              options={options}
              onChange={(newVal) => changeHandler(newVal)}
            />
          </SelectContainer>
          <CustomInput placeholder="Paste Custom Text Here!" />
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
  justify-content: center;
  width: 100%;
`;

const Controls = styled.div`
  width: 35%;
  height: 70vh;
  padding-top: 1rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  button {
    max-width: 50%;
    margin-left: 4rem;
    margin-bottom: 4rem;
    background-color: #4b4b4c;
    color: #f6f4ec;
    border: solid 1px #4b4b4c;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.1);
      background-color: #f6f4ec;
      color: #4b4b4c;
      border: solid 1px #4b4b4c;
    }
    :active,
    :focus,
    :visited {
      background-color: #fcf3cf;
      color: #4b4b4c;
      border: solid 1px #4b4b4c;
    }
  }
`;

const SelectContainer = styled.div`
  margin-left: 3.8rem;
`;

const ParaControlContainer = styled.div`
  width: 65%;
  display: flex;
  margin-bottom: 4rem;
  justify-content: space-between;
  align-items: center;
  span {
    font-weight: bold;
  }
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
  justify-self: flex-end;
`;

const CopyContainer = styled.div`
  margin-bottom: 0.3rem;
  height: 8%;
  width: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span:hover {
    cursor: pointer;
  }
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

const ParagraphSmallContainer = styled.div`
  height: 13%;
  padding: 1.25rem;
  margin-right: 5rem;
  margin-top: 4rem;

  border: solid 3px #737373;
  border-radius: 3px;
  background-color: #f6f7ed;
`;

const CustomInput = styled.input`
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ParagraphTest = styled.p`
  white-space: nowrap;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
