const fs = require('fs');
const path = require('path');
const Question = require('../models/question');

class QuestionService {
  constructor() {
    this.questionStore = this.loadQuestionStore();
  }

  loadQuestionStore() {
    const filePath = path.join(__dirname, '..', 'data', 'questionData.json');
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading question store:', error.message);
      return [];
    }
  }

  getQuestionsByDifficulty(difficulty) {
    return this.questionStore.filter(question => question.difficulty === difficulty);
  }
}

module.exports = new QuestionService();
