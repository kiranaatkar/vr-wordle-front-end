import { answerWords } from "./word-lists/answer-words.js";
import { allowedWords } from "./word-lists/allowed-words.js";

function getRandomAnswerWord(answerWords) {
  let answer = answerWords[Math.floor(Math.random() * answerWords.length)];
  return answer;
}

function compare(guess, allowedWords, answer) {
  let result = [];
  if (allowedWords.includes(guess)) {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        result.push("🟩");
      } else if (answer.indexOf(guess[i]) !== -1) {
        result.push("🟨");
      } else {
        result.push("⬜️");
      }
    }
    return result;
  } else {
    return "Invalid word";
  }
}

function game() {
  let fullGreen = ["🟩", "🟩", "🟩", "🟩", "🟩"];
  let results = [];
  let fullAllowedWords = [...answerWords, ...allowedWords];
  let answer = getRandomAnswerWord(answerWords);
  while (
    results.length < 6 &&
    JSON.stringify(results[results.length - 1]) !== JSON.stringify(fullGreen)
  ) {
    let guess = prompt("Enter a guess:").toLowerCase();
    let result = compare(guess, fullAllowedWords, answer);
    if (result.length === 5) {
      results.push(result);
      console.log(results);
    } else {
      console.log("Invalid word");
    }
  }
  if (
    JSON.stringify(results[results.length - 1]) === JSON.stringify(fullGreen)
  ) {
    console.log("Well done!!");
  } else {
    console.log("Try again next time");
  }
}

game();
