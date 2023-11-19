const questionService = require('../services/questionService');

class QuestionGenerator {
  generateQuestionPaper(totalMarks, difficultyDistribution) {
    const questionPaper = [];
    
    for (const difficulty in difficultyDistribution) {
      const percentage = difficultyDistribution[difficulty];
      const marksForDifficulty = Math.round(totalMarks * percentage);
      const difficultyQuestions = this.getQuestionsForDifficulty(difficulty, marksForDifficulty);
      questionPaper.push(...difficultyQuestions);
    }

    return questionPaper;
  }

  getQuestionsForDifficulty(difficulty, marks) {
    const questions = questionService.getQuestionsByDifficulty(difficulty);
    const selectedQuestions = [];
    if (questions.length === 0) {
      console.error(`No questions available for difficulty level '${difficulty}'.`);
      process.exit(1);
    }
    let remainingMarks = marks;
    while (remainingMarks > 0 && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[randomIndex];

      if (selectedQuestion.marks <= remainingMarks) {
        selectedQuestions.push(selectedQuestion);
        remainingMarks -= selectedQuestion.marks;
      } else {
        questions.splice(randomIndex, 1);
      }
    }

    return selectedQuestions;
  }
}

module.exports = new QuestionGenerator();
