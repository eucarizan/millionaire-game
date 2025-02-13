const URL = 'http://127.0.0.1:8080/question.json';
const container = document.getElementById("container");
const usedIndexes = new Set();

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
  let number = 1;
  let idx = getNumber();
  let tempHTML = createQuestion(questions[idx], number);

  container.innerHTML = tempHTML;
}

function getNumber() {
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * questions.length);
  } while (usedIndexes.has(randomNum));

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
      <li id="ans-d">${q.C}</li>
    </ol>
  </div>
  `;
}

game();

// TODO-02 save the index to a set so question cannot be repeated
// TODO-03 logic for checking if correct answer
// TODO-04 end game if lose
