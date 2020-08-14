import React from "react";

const alphaLower = "abcdefghijklmnopqrstuvwxyz";
const alphaUpper = alphaLower.toUpperCase();
const lowerArr = alphaLower.split("");
const upperArr = alphaUpper.split("");
const endSentChars = [".", "?", "!"];
cache = {};

const indicate = (word) => {
  const firstLetter = word[0];
  const secondLetter = word[1];
  const lastLetter = word[word.length - 1];
  const secondToLastLetter = word[word.length - 2];

  if (word.length < 2) {
    if (upperArr.contains(firstLetter)) {
      return 0; // ===Start===
    } else {
      if (firstLetter === '"' && upperArr.contains(secondLetter)) {
        return 0;
      } else if (endSentChars.contains(lastLetter)) {
        return 1; // ===Stop===
      } else if (
        endSentChars.contains(secondToLastLetter) &&
        (lastLetter === '"' || lastLetter === "'")
      ) {
        return 1;
      } else {
        return 2; // ===Middle===
      }
    }
  }
};

const addTextToCache = (text) => {
  wordArr = text.split(" ");

  for (let i = 0; i < wordArr.length; i++) {
    let currWord = wordArr[i];

    if (i < wordArr.length - 1) {
      let nextWord = wordArr[i + 1];
    }
  }
};

export default addTextToCache;
