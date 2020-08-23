import React from "react";

const alphaLower = "abcdefghijklmnopqrstuvwxyz";
const alphaUpper = alphaLower.toUpperCase();
const lowerArr = alphaLower.split("");
const upperArr = alphaUpper.split("");
const endSentChars = [".", "?", "!"];
let cache = {};

const indicate = (word) => {
  const firstLetter = word[0];
  const secondLetter = word[1];
  const lastLetter = word[word.length - 1];
  const secondToLastLetter = word[word.length - 2];
  if (word.length < 2 && upperArr.includes(firstLetter)) {
    return 0; // ===Start===
  } else if (
    (firstLetter === '"' || firstLetter === "'") &&
    upperArr.includes(secondLetter)
  ) {
    return 0;
  } else if (endSentChars.includes(lastLetter)) {
    return 1; // ===Stop===
  } else if (
    endSentChars.includes(secondToLastLetter) &&
    (lastLetter === `"` || lastLetter === `'`)
  ) {
    return 1;
  } else {
    return 2; // ===Middle===
  }
};

const getRandStart = () => {
  let allKeysArr = Object.keys(cache);
  let randWord = allKeysArr[Math.floor(Math.random() * allKeysArr.length)];
  let indicator = cache[randWord]["indicator"];

  while (indicator !== 0) {
    randWord = allKeysArr[Math.floor(Math.random() * allKeysArr.length)];
    indicator = cache[randWord]["indicator"];
  }

  return randWord;
};

const wordincludesOddQuoteCount = (word) => {
  let quoteCount = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === '"') {
      quoteCount += 1;
    }
  }
  if (quoteCount % 2 !== 0) {
    return true;
  } else {
    return false;
  }
};

const generateParagraphs = (text, requestedNumOfParagraphs) => {
  //=======populate cache with input text=======
  let nextWord = null;
  text = text.replace(/\n|\r/g, " ");
  let wordArr = text.split(" ");
  wordArr = wordArr.filter((word) => {
    return word !== "";
  });

  for (let i = 0; i < wordArr.length; i++) {
    let currWord = wordArr[i];

    if (typeof wordArr[i + 1] !== undefined) {
      nextWord = wordArr[i + 1];
    }
    if (i > 0) {
      let prevWord = wordArr[i - 1];
      if (!cache[prevWord]["wordAfterList"].includes(currWord)) {
        cache[prevWord]["wordAfterList"].push(currWord);
      }
    }
    if (!Object.keys(cache).includes(currWord)) {
      let newWordObj = {};
      newWordObj["wordAfterList"] = [];
      newWordObj["indicator"] = indicate(currWord);
      cache[currWord] = newWordObj;
    } else {
      if (i < wordArr.length - 1) {
        if (!cache[currWord]["wordAfterList"].includes(nextWord)) {
          cache[currWord]["wordAfterList"].push(nextWord);
        }
      }
    }
  }

  //=======chain words for number of sentences=======

  let paragraphCount = 0;
  let paragraphArr = [];

  while (paragraphCount < requestedNumOfParagraphs) {
    let numOfSentences = Math.floor(Math.random() * 7) + 1;
    let sentenceArr = [];
    let sentenceCount = 0;
    while (sentenceCount < numOfSentences) {
      let currentSentence = "";
      let quoteStarted = false;
      let sentenceStopped = false;
      let currRandomWord = getRandStart();
      currentSentence += currRandomWord + " ";
      // check if current word has an odd num of quotation marks
      // if it does then check if the sentence is stopped
      // switch the quoteStarted bool on/off depending on whether the sentencce last started or ended a quote
      if (wordincludesOddQuoteCount(currRandomWord)) {
        quoteStarted = !quoteStarted;
      }
      // loop until you hit a word with a "stop" indicator in the cache
      while (!sentenceStopped) {
        // get the current word object from the cache
        let currWordObj = cache[currRandomWord];
        // if there are words in the "wordAfterList" in the word object
        // select a random word and reassign that to the currRandomWord var
        if (currWordObj["wordAfterList"].length > 0) {
          currRandomWord =
            currWordObj["wordAfterList"][
              Math.floor(Math.random() * currWordObj["wordAfterList"].length)
            ];
          currentSentence += currRandomWord;
          if (currWordObj["wordAfterList"].length > 0) {
            currentSentence += " ";
          }

          // if the current word has an indicator of 1, this is the stop value
          // so stop the sentence and break the loop
          if (cache[currRandomWord]["indicator"] === 1) {
            sentenceStopped = true;
          }
          // if there are no more words in the "wordAfterList" then stop
          // the sentence and break the loop
          // check if current word has an odd num of quotation marks
          // if it does then check if the sentence is stopped
          // switch the quoteStarted bool on/off depending on whether the sentencce last started or ended a quote
          if (wordincludesOddQuoteCount(currRandomWord)) {
            quoteStarted = !quoteStarted;
          }
        } else {
          sentenceStopped = true;
          // since we've now broken the loop and completed the sentence
          // we should close the quote if it is currently open
          if (quoteStarted === true) {
            quoteStarted = !quoteStarted;
            if (!wordincludesOddQuoteCount(currRandomWord)) {
              currentSentence += `"`;
            }
          }
        }
      }
      // since we've now broken the loop and completed the paragraph
      // we should close the quote if it is currently open
      if (quoteStarted === true) {
        quoteStarted = !quoteStarted;
        if (!wordincludesOddQuoteCount(currRandomWord)) {
          currentSentence += `"`;
        }
      }
      sentenceArr.push(currentSentence);
      sentenceCount += 1;
    }
    paragraphArr.push(sentenceArr.join(" "));
    paragraphCount += 1;
  }
  let outputText = paragraphArr.join("\n\n");
  return outputText;
};

export default generateParagraphs;
