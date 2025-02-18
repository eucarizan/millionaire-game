const URL = 'http://127.0.0.1:8080/question.json';
const container = document.getElementById("container");
const maxQuestions = 15;

let usedIndexes;
let chosenQ;
let correct;
let number;
let username;
let prize;

let questions = [];

const game = async () => {
  document.getElementById('fiftyFiftyBtn').hidden = true;
  document.getElementById('skipTheQuestionBtn').hidden = true;
  document.getElementById('container').hidden = true;
  document.getElementById('input__user-name').value = "";
  document.getElementById('endgame').hidden = true;
  document.getElementById('start').hidden = false;

  username = "";
  correct = true;
  number = 1;
  prize = 0;
  questions = [];
  usedIndexes = new Set();

  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      questions = json;
    })
    .catch((error) => console.log(error));
}

function startGame() {
  document.getElementById('fiftyFiftyBtn').hidden = false;
  document.getElementById('skipTheQuestionBtn').hidden = false;
  document.getElementById('container').hidden = false;
  document.getElementById('start').hidden = true;
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
    container.innerHTML = "";
    document.getElementById('fiftyFiftyBtn').hidden = true;
    document.getElementById('skipTheQuestionBtn').hidden = true;
    document.getElementById('endgame').hidden = false;
    document.getElementById('game-end').innerText = `${username}, you've lost! You have earned: ${prize}$`;
    document.getElementById('restart').addEventListener('click', () => game());
  } else {
    number++;
    askQuestion();
    prize += 100;
  }
}

function fiftyFifty() {
  document.getElementById('fiftyFiftyBtn').hidden = true;

  let elements = [
    {"idx": 0, "id": "ans-a", "letter": "A"},
    {"idx": 1, "id": "ans-b", "letter": "B"},
    {"idx": 2, "id": "ans-c", "letter": "C"},
    {"idx": 3, "id": "ans-d", "letter": "D"}
  ];

  let ansIdx = elements.findIndex(e => e.letter === chosenQ.answer);
  let wrongIdxs = elements.map(e => e.idx).filter(idx => idx !== ansIdx);
  let keepIdx = wrongIdxs[Math.floor(Math.random() * wrongIdxs.length)];

  wrongIdxs.filter(idx => idx !== keepIdx).forEach(idx => {
    document.getElementById(elements[idx].id).hidden = true;
  });

  // TODO - refactor? do i need to retain the original letter?
}

function skipQuestion() {
  document.getElementById('skipTheQuestionBtn').hidden = true;
  number++;
  askQuestion();
}

game();

document.getElementById('fiftyFiftyBtn').addEventListener('click', () => fiftyFifty());
document.getElementById('skipTheQuestionBtn').addEventListener('click', () => skipQuestion());
document.getElementById('userform').addEventListener('submit', (event) => {
  event.preventDefault();
  username = event.target[0].value;
  startGame();
});
