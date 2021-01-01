'use strict';

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const quizSchema = new Schema({
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: Array
});

module.exports = mongoose.model('Quiz', quizSchema);
