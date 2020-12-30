"use strict";

const router = require("express").Router();
const quizzesController = require("../controllers/quizzesController");

router.get(
  "/api/quizzes",
  quizzesController.index,
  quizzesController.filterUserCourses,
  quizzesController.respondJSON
);
router.use(quizzesController.errorJSON);

module.exports = router;
