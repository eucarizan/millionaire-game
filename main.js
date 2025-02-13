const URL = 'http://127.0.0.1:8080/question.json';

let questions = [];

const game = async () => {
  let container = document.getElementById("container");
  fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      questions = json;
      
      let questionString = `[${questions
        .map(q => JSON.stringify(q))
        .join(",")}]`;

      container.innerHTML = questionString;
    })
    .catch((error) => console.log(error));
}

game();
