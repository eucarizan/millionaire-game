const URL = 'http://127.0.0.1:8080/question.json';
const container = document.getElementById("container");
const usedIndexes = new Set();
const maxQuestions = 15;

let chosenQ;
let correct = true;
let number = 1;

let questions = [];

const game = async () => {
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      questions = json;
      startGame();
    })
    .catch((error) => console.log(error));
}

function startGame() {
  askQuestion();
}

function askQuestion() {
  if (number > maxQuestions || !correct) {
    return;
  }

  let idx = getNumber();
  chosenQ = questions[idx];

  let tempHTML = createQuestion(chosenQ, number);
  container.innerHTML = tempHTML;

  document.getElementById('ans-a').addEventListener('click', () => checkAnswer('A'));
  document.getElementById('ans-b').addEventListener('click', () => checkAnswer('B'));
  document.getElementById('ans-c').addEventListener('click', () => checkAnswer('C'));
  document.getElementById('ans-d').addEventListener('click', () => checkAnswer('D'));
}

function getNumber() {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.has(randomNum));

  usedIndexes.add(randomNum);
  return randomNum;
}

function createQuestion(q, index) {
  return `
  <div>
    <p>${index}. ${q.question}</p>
    <ol type="A">
      <li id="ans-a">${q.A}</li>
      <li id="ans-b">${q.B}</li>
      <li id="ans-c">${q.C}</li>
      <li id="ans-d">${q.D}</li>
    </ol>
  </div>
  `;
}

function checkAnswer(letter) {
  if (letter !== chosenQ.answer) {
    correct = false;
    container.innerHTML = "You lose!";
  } else {
    number++;
    askQuestion();
  }
}

function fiftyFifty() {
  console.log("fifty fifty");
}

function skipQuestion() {
  console.log("skip the question");
}

game();

document.getElementById('fiftyFiftyBtn').addEventListener('click', () => fiftyFifty());
document.getElementById('skipTheQuestionBtn').addEventListener('click', () => skipQuestion());
