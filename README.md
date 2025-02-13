# who wants to be a millionaire

- [who wants to be a millionaire](#who-wants-to-be-a-millionaire)
  - [learning](#learning)
  - [about](#about)
  - [stages](#stages)
    - [1: connecting to a json file](#1-connecting-to-a-json-file)
    - [2: structure of the game](#2-structure-of-the-game)

## learning
you will learn how to handle browser events, work with json objects, and program game logic using js. this will save you from the fear of using javascript!

## about
some may think that front-end development is only about manufacturing similar web pages like online shops or landings. but the things you can program with html, css, and js are infinite and bounded with only your imagination. 

browser games are one of the items on this list because they do not always require a server, which means you can apply your skills and knowledge in the interface to create your own game, which is what the project is about. when creating a game, the emphasis will be on js. therefore, we will almost not use html and css here, and all html markup will be done using js.

## stages
### 1: connecting to a json file
<details>
<summary>connect a file with questions and answer options.</summary>

#### 1.0 theory
`fetch` is the method for sending a network request to the server, so you can both get and send data.

the `fetch(url, options)` function takes two parameters:
- the url to make the request to;
- `options` (optional) is a configuration object where you can configure the `request` method, request body, headers, and so on.

the result of the `fetch()` call will be a promise, which contains a special response object. this object has two important fields:
- `ok` accepts the true or false status and reports the success of the request;
- the `json` method; once is called, it returns the result of the request in the form of json.

but when accessing a local file via `fetch`, there may be a problem with the same origin policy, which prohibits making requests to resources located in another domain.

in most browsers, such requests to local files are not allowed by default, which may cause a cors (cross-origin resource sharing) error. to work around this problem, you can use a local server, such as an `http-server`, which will allow you to run files on the local host and bypass the cors policy.

to install:
`npm install -g http-server`
starting from the directory where the html file is located:
`http-server --cors`
url becomes as follows:
`const url = 'http://127.0.0.1:8080/question.json';`

>make sure you're running the local server while running the checks for the project. you should run the local server in the directory where the html file is located and it's important that you use the above url.

#### 1.1 description
welcome to the first stage! in this stage, you need to get the file's contents by reference.

notice the json file in the project folder. you will use the json file named `question.json`.

this stage is simple, but very important since the file contains questions and various answers, among which one is correct. all the content will be used for our game to display information on the screen.

questions and answers will be displayed on the page, but don't worry, it's only in this stage, to check out if the json file is connected. then you should clear the page.

#### 1.2 objectives
as a result of the stage, you should have a `game()` function that accepts a url with a json file. at the output on the page in the block with `id=container`, there should be an array with questions, answers, and the correct answer.

#### 1.3 examples

![game demo](./s01.png)

</details>

### 2: structure of the game
<details>
<summary>add functions for displaying questions and answer options, with checking answers.</summary>

#### 2.1 description
the second stage is where you develop the game logic. as you have already noticed, questions and answers are stored as objects. objects allow you to group data (for example, variables) into a single object that is easy to use. thus, the question, possible answers, and one correct answer will be part of one object. for the convenience of displaying an object, it is better to use a list. this object will be randomly selected and displayed on the screen. beware, no more than 15 questions.

we will also check the answer for correctness. when you click on the answer, we check whether it is correct. if yes, then proceed to the next question. otherwise, we display a message about the loss. to check whether the answer provided by the user is correct, you should simply compare it with the field of a specific object.

there is a recommendation on how to switch levels. only a few things can happen at one level, so it's worth trying conditional operators to make everything work. if this answer is correct, the level increases, and the next iteration begins. otherwise, the game ends.

for the convenience of reading the code, create a separate function for each action (for example, the output of questions, checking the answer, etc.).

>do not forget that in order for the code to work correctly and the tests to pass, it is necessary to use a local server:
>`http-server --cors`

#### 2.2 objectives
this stage is probably the toughest, but the most interesting. in the output, you should have:
- function for the output of questions and answer options;
- function to check the user's response.

get the answer the user sent by clicking on one of the answers and check whether it's correct or not;
```javascript
let checktheanswer = () => {
  useranswer === correctanswer ? continue : break;
}
```

- switch levels depending on the given answers;
- output no more than 15 questions.

```javascript
let questionnumber = 0;

let outputrandomquestions = () => {
  let dataquestion = datajson[random];

  if (questionnumber < 15) {
	questionnumber++;
	...
  }
}
```

#### 2.3 examples

![stage 2 demo](./s02.gif)

</details>

[<<](https://github.com/eucarizan/front-end/blob/main/README.md)
<!--
:%s/\(Sample \(Input\|Output\) \d:\)\n\(.*\)/```\r\r**\1**\r```\3/gc

### 0: 
<details>
<summary></summary>

#### 0.1 description

#### 0.2 objectives

#### 0.3 examples

![demo](./demo.png)

</details>
-->

