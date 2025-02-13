# who wants to be a millionaire

- [who wants to be a millionaire](#who-wants-to-be-a-millionaire)
  - [learning](#learning)
  - [about](#about)
  - [stages](#stages)
    - [1: connecting to a json file](#1-connecting-to-a-json-file)

## learning
you will learn how to handle browser events, work with json objects, and program game logic using js. this will save you from the fear of using javascript!

## about
some may think that front-end development is only about manufacturing similar web pages like online shops or landings. but the things you can program with html, css, and js are infinite and bounded with only your imagination. 

browser games are one of the items on this list because they do not always require a server, which means you can apply your skills and knowledge in the interface to create your own game, which is what the project is about. when creating a game, the emphasis will be on js. therefore, we will almost not use html and css here, and all html markup will be done using js.

## stages
### 1: connecting to a json file
<details>
<summary></summary>

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

