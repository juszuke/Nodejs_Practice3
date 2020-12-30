"use strict";

// 各オブジェクトを取得する
const title = document.getElementById("title");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const question = document.getElementById("question");

// ボタン
const start = document.getElementById("start");
const answers = document.getElementById("answers");
const home = document.getElementById("home");

let quizSet = [];
let currentNum = 0;
let isAnswered;
let score = 0;

// 初期化する処理
const initQuizList = () => {
  quizSet = [];
  currentNum = 0;
  score = 0;
};

// 初期化＋ホーム画面へ移動する処理
// eslint-disable-next-line no-unused-vars
const showHome = () => {
  title.textContent = "ようこそ";
  category.textContent = "";
  difficulty.textContent = "";
  question.textContent = "以下のボタンをクリック";
  home.classList.add("none");
  start.classList.remove("none");

  initQuizList();
};

// クイズデータを外部APIから取得する処理
const fetchQuizList = () => {
  return fetch("/api/v1/quizzes")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        quizSet.push(data[i]);
      }
    });
};

// クイズデータ取得＋待機画面へ移動する処理
const showLoadingPage = () => {
  title.textContent = "取得中";
  category.textContent = "";
  difficulty.textContent = "";
  question.textContent = "少々お待ちください";
  start.classList.add("none");
};

// 選択肢をシャッフルする処理
function shuffleChoices(choices) {
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[j], choices[i]] = [choices[i], choices[j]];
  }
  return choices;
}

// クイズの正解判定をする処理
function checkAnswer(button) {
  if (isAnswered) {
    return;
  }
  isAnswered = true;
  if (button.textContent === quizSet[currentNum].correct_answer) {
    console.log("correct");
    score++;
  } else {
    console.log("wrong");
  }
}

// クイズ回答画面へ移動する処理
const setQuiz = () => {
  isAnswered = false;

  title.textContent = `問題${currentNum + 1}`;
  category.textContent = `[ジャンル] ${quizSet[currentNum].category}`;
  difficulty.textContent = `[難易度] ${quizSet[currentNum].difficulty}`;
  question.textContent = quizSet[currentNum].question;

  // correct_answerとincorrect_answersを結合してchoicesを作成する
  const choices = quizSet[currentNum].incorrect_answers.concat(
    quizSet[currentNum].correct_answer
  );
  quizSet[currentNum]["choices"] = choices; // choicesをquizSetに追加する

  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }

  const shuffledChoices = shuffleChoices(quizSet[currentNum].choices);
  shuffledChoices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => {
      checkAnswer(button);
    });
    answers.appendChild(button);
  });
  answers.classList.remove("none");
};

// 結果画面へ移動する処理
const showResult = () => {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }

  title.textContent = `あなたの正解数は${score}です！！`;
  category.textContent = "";
  difficulty.textContent = "";
  question.textContent = "再度チャレンジしたい場合は以下をクリック！!";
  answers.classList.add("none");
  home.classList.remove("none");
};

// eslint-disable-next-line no-unused-vars
async function loadQuizList() {
  showLoadingPage();
  await fetchQuizList();
  setQuiz();
}

// 最後の問題に回答したら結果ページへ、それ以外は次の問題へ進む処理
answers.addEventListener("click", () => {
  if (currentNum === quizSet.length - 1) {
    showResult();
  } else {
    currentNum++;
    setQuiz();
  }
});
