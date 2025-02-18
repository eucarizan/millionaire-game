const URL = 'http://127.0.0.1:8080/question.json';
const maxQuestions = 15;

let usedIndexes = new Set();
let chosenQ, correct, number, username, prize;
let questions = [];

const getEl = (id) => document.getElementById(id);

const fetchQuestions = async () => {
  try {
    const response = await fetch(URL);
    questions = await response.json();
  } catch (error) {
    console.error("Error fetching questions: ", error);
  }
};

const startGame = () => {
  getEl('first').hidden = false;
  getEl('fiftyFiftyBtn').hidden = true;
  getEl('skipTheQuestionBtn').hidden = true;
  getEl('container').hidden = true;
  getEl('endgame').hidden = true;
  getEl('start').hidden = true;

  getEl('startGameBtn').addEventListener('click', game);
};

const game = async () => {
  getEl('first').hidden = true;
  getEl('start').hidden = false;
  getEl('input__user-name').value = "";

  username = "";
  correct = true;
  number = 1;
  prize = 0;
  usedIndexes.clear();

  await fetchQuestions();
};

const startAsking = () => {
  getEl('fiftyFiftyBtn').hidden = false;
  getEl('skipTheQuestionBtn').hidden = false;
  getEl('container').hidden = false;
  getEl('start').hidden = true;
  askQuestion();
};

const askQuestion = () => {
  if (number > maxQuestions) {
    endGame(true);
    return;
  }

  let idx = getNumber();
  chosenQ = questions[idx];

  getEl('container').innerHTML = createQuestion(chosenQ, number);

  ['A', 'B', 'C', 'D'].forEach(letter => {
    getEl(`ans-${letter.toLowerCase()}`).addEventListener('click', () => checkAnswer(letter));
  });
};

const getNumber = () => {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.has(randomNum));

  usedIndexes.add(randomNum);
  return randomNum;
};

const createQuestion = (q, index) => `
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

const checkAnswer = (letter) => {
  if (letter !== chosenQ.answer) {
    correct = false;
    endGame(false);
  } else {
    prize += 100;
    number++;
    askQuestion();
  }
};

const endGame = (won) => {
  getEl('container').innerHTML = "";
  getEl('fiftyFiftyBtn').hidden = true;
  getEl('skipTheQuestionBtn').hidden = true;
  getEl('endgame').hidden = false;

  getEl('game-end').innerText = `${username}, you've ${won ? "won" : "lost"}! You have earned: ${prize}$`;

  getEl('restart').addEventListener('click', startGame);
};

const fiftyFifty = () => {
  getEl('fiftyFiftyBtn').hidden = true;

  const elements = [
    { "id": "ans-a", "letter": "A" },
    { "id": "ans-b", "letter": "B" },
    { "id": "ans-c", "letter": "C" },
    { "id": "ans-d", "letter": "D" }
  ];

  const correctIdx = elements.findIndex(e => e.letter === chosenQ.answer);
  const wrongIdxs = elements.filter((_, i) => i !== correctIdx);
  const keepIdx = wrongIdxs[Math.floor(Math.random() * wrongIdxs.length)];

  wrongIdxs.forEach(({ id }) => {
    if (id !== keepIdx.id) getEl(id).hidden = true;
  });

  // TODO - refactor? do i need to retain the original letter?
};

const skipQuestion = () => {
  getEl('skipTheQuestionBtn').hidden = true;
  number++;
  askQuestion();
};

startGame();

getEl('fiftyFiftyBtn').addEventListener('click', fiftyFifty);
getEl('skipTheQuestionBtn').addEventListener('click', skipQuestion);
getEl('userform').addEventListener('submit', (event) => {
  event.preventDefault();
  username = event.target[0].value;
  startAsking();
});
