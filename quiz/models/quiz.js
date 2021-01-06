/* eslint-disable no-undef */
'use strict';

module.exports = class Quiz {
  constructor(
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers
  ) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
};
