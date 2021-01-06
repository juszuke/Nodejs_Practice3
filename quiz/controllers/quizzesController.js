/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
'use strict';

const Quiz = require('../models/quiz');
const fetch = require('node-fetch');
let quizList = [];

module.exports = {
  fetchQuizListFromTriviaDB: (req, res, next) => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          const quiz = data.results;
          quizList[i] = new Quiz(
            quiz[i].category,
            quiz[i].type,
            quiz[i].difficulty,
            quiz[i].question,
            quiz[i].correct_answer,
            quiz[i].incorrect_answers
          );
        }
      })
      .catch((error) => {
        res.send(error);
      });
    next();
  },

  getQuizList: (req, res) => {
    res.json(quizList);
  },

  initQuizList: (req, res, next) => {
    quizList = [];
    next();
  },

  showHomePage: (req, res) => {
    res.render('index');
  },
};
