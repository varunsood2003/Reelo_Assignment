const questionGenerator = require('./utils/questionGenerator');
const inputDistribution = process.argv[2] || '(100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })';
const { totalMarks, difficultyDistribution } = parseDescriptiveInput(inputDistribution);

const questionPaper = questionGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);

console.log(`Generated Question Paper (${totalMarks} marks):`);
questionPaper.forEach(question => console.log(question));

function parseDescriptiveInput(input) {
  const regex = /\((\d+) marks, Difficulty, \{(\d+)% Easy, (\d+)% Medium, (\d+)% Hard \}\)/;
  const match = input.match(regex);

  if (!match) {
    console.error('Invalid input format. Please use the format: (100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })');
    process.exit(1);
  }
  const totalMarks = parseInt(match[1]);
  const easyPercentage = parseFloat(match[2]);
  const mediumPercentage = parseFloat(match[3]);
  const hardPercentage = parseFloat(match[4]);
  const calculatedDistribution = {
    Easy: easyPercentage / 100,
    Medium: mediumPercentage / 100,
    Hard: hardPercentage / 100,
  };

  return { totalMarks, difficultyDistribution: calculatedDistribution };
}
