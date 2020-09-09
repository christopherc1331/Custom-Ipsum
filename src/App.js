import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import TextLoop from "react-text-loop";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CopyOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { sampleText } from "./sampleText.js";
import { toshiba } from "./toshiba.js";
import { zenOfPython } from "./zenOfPython.js";
import { romeoAndJuliet } from "./romeoAndJuliet.js";
import { harryPotter } from "./harryPotter.js";
import generateParagraphs from "./MarkovsChain";
import { Button } from "antd";
import Select from "react-select";
import ReactGA from "react-ga";

function App() {
  const initializeReactGA = () => {
    ReactGA.initialize("UA-177553957-1");
    ReactGA.pageview("/homepage");
  };

  useEffect(() => {
    initializeReactGA();
  }, []);

  const [custom, setCustom] = useState("");
  const textOptions = {
    romeoAndJuliet: {
      text: romeoAndJuliet,
      desc: "Romeo and Juliet (Shakespeare)",
    },
    zenOfPython: {
      text: zenOfPython,
      desc: "Zen Of Python (Tim Peters)",
    },
    harryPotter: {
      text: harryPotter,
      desc: "Harry Potter (JK Rowling)",
    },
    toshiba: {
      text: toshiba,
      desc: "TV - Operating Instructions (Toshiba)",
    },
    custom: {
      text: custom,
      desc: "Custom Text (Your Choice!)",
    },
  };
  const [paraCount, setParaCount] = useState(6);
  const [choice, setChoice] = useState("romeoAndJuliet");
  const [displayText, setDisplayText] = useState(
    `Select an option from the drop down menu to get started`
  );

  const [copyText, setCopyText] = useState("Copy");
  const [paraLabel, setParaLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    {
      value: "romeoAndJuliet",
      label: "Romeo and Juliet (Shakespeare)",
    },
    {
      value: "harryPotter",
      label: "Harry Potter (JK Rowling)",
    },
    { value: "zenOfPython", label: "Zen Of Python (Tim Peters)" },
    { value: "toshiba", label: "TV - Operating Instructions (Toshiba)" },
    {
      value: "custom",
      label: "Custom Text (Your Choice!)",
    },
  ];

  const inputChangeHandler = (e) => {
    setCustom(e.target.value);
  };

  const submitForm = () => {
    if (choice !== "custom") {
      setDisplayText(
        generateParagraphs(textOptions[choice]["text"], paraCount)
      );
    } else {
      if (custom === "") {
        window.alert("Please add some text to the 'Custom Text' box.");
      } else {
        setDisplayText(
          generateParagraphs(textOptions[choice]["text"], paraCount)
        );
      }
    }
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
      width: "62%",
    }),
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
            <h2>
              Number of paragraphs:
              <span>{`   ${paraCount}`}</span>
            </h2>
          </ParaControlContainer>
          <SelectContainer>
            <Select
              styles={customStyles}
              options={options}
              onChange={(newVal) => {
                setChoice(newVal.value);
                setParaLabel(newVal.label);
              }}
            />
          </SelectContainer>
          <CustomInput
            display={choice === "custom" ? "block" : "none"}
            onChange={(e) => inputChangeHandler(e)}
            value={custom}
            placeholder="Paste Custom Text Here!"
          />
          <Button
            type="Primary"
            onClick={() => {
              submitForm();
            }}
          >
            {`Generate ${
              paraCount > 1 ? "More Paragraphs" : "Another Paragraph"
            }`}
          </Button>
        </Controls>
        <Right>
          <ParagraphTopBar>
            <CopyContainer onClick={() => copyCurrentText()}>
              <CopyOutlined style={{ fontSize: "30px" }} />
              <h4>{copyText}</h4>
            </CopyContainer>
            <h2>{paraLabel}</h2>
          </ParagraphTopBar>
          <ParagraphContainer>
            {loading ? (
              <LoadingOutlined />
            ) : (
              <Paragraphs>{displayText}</Paragraphs>
            )}
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
    margin-left: 7rem;
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
  margin-left: 7rem;
  margin-bottom: 4rem;
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

const ParagraphTopBar = styled.div`
  width: 80%;
  height: 4rem;
  display: flex;
  align-items: center;
  h2 {
    padding-left: 4rem;
  }
`;

const CopyContainer = styled.div`
  margin-bottom: 0.3rem;
  width: 5rem;
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

const CustomInput = styled.input`
  color: #282626;
  display: ${(props) => props.display};
  width: 200px;
  margin-left: 7rem;
  margin-bottom: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  placeholder {
    color: #282626;
  }
`;

export default App;
