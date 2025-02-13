const URL = 'http://127.0.0.1:8080/question.json';

let questions = [];

const game = async () => {
  let container = document.getElementById("container");
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      questions.push(JSON.stringify(json));
      container.innerHTML = questions;
    })
    .catch((error) => console.log(error));
}

game();
