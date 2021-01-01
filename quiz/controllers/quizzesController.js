'use strict';

const Quiz = require('../models/quiz');
const fetch = require("node-fetch");

module.exports = {
  fetchQuizListFromTriviaDB: (req, res, next) => {
    fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        const quiz = data.results;
        const newQuiz = new Quiz({
          category: quiz[i].category,
          type: quiz[i].type,
          difficulty: quiz[i].difficulty,
          question: quiz[i].question,
          correct_answer: quiz[i].correct_answer,
          incorrect_answers: quiz[i].incorrect_answers
        });
        newQuiz.save()
      }
    })
    .then(() => {
      console.log("quiz saved")
    })
    .catch((error) => {
      res.send(error)
    });
    next();
  },

  getQuizList: (req, res) => {
    Quiz.find({})
      .exec()
      .then((quizList) => {
        res.json(quizList)
      })
      .catch((error) => {
        console.log(error.message);
        return [];
      })
      .then(() => {
        console.log("quiz is ready");
      });
  },

  initQuizList: (req, res, next) => {
    Quiz.remove({})
      .then(() => {
        console.log("quiz removed");
      })
      .catch((error) => {
        res.send(error)
      });
    next();
  },

  showHomePage: (req, res) => {
    res.render("index")
  }
};
