/**
 * 1. Create layout
  <div class="snake-board">
    <div class="snake-board-box"></div> * 100
  </div>
*/
(function createLayout() {
  // <div class="snake-board">
  const snakeBoard = document.createElement("div");
  document.body.appendChild(snakeBoard);
  snakeBoard.classList.add("snake-board");

  for (let i = 0; i < 100; i++) {
    const createSnakeBoardBoxes = document.createElement("div");
    snakeBoard.appendChild(createSnakeBoardBoxes);
    createSnakeBoardBoxes.classList.add("snake-board-box");
  }
})();

/*
Chose all elements
Array of node list divs => 0 - 99 elements
<div class="snake-board-box"></div> * 100
*/
const nodeListArrayOfsnakeBoardBox =
  document.querySelectorAll(".snake-board-box");
// console.log(nodeListArrayOfsnakeBoardBox);

// const listArrayOfsnakeBoardBox = Array.from(
//   document.querySelectorAll(".snake-board-box")
// );
// console.log(listArrayOfsnakeBoardBox);

/*
Like a school coordinates
posX => x => 1 - 10 to right
posY => y => 1 - 10 to up
*/
(function createAttCoord() {
  let x = 1,
    y = 10;

  for (let i = 0; i < nodeListArrayOfsnakeBoardBox.length; i++) {
    if (x > 10) {
      x = 1;
      y--;
    }
    nodeListArrayOfsnakeBoardBox[i].setAttribute("posX", x);
    nodeListArrayOfsnakeBoardBox[i].setAttribute("posY", y);
    x++;
  }
})();

// get random coordinates in array
const getRandomCoord = () => {
  const posX = Math.round(Math.random() * (10 - 3) + 3);
  const posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
};

// Snake default coordinates on random field
const snakeDefaultCoord = getRandomCoord();

// create default snakeBody with random coordinates
const getCoord = (x, y) =>
  document.querySelector(`[posX ="${x}"][posY ="${y}"]`);

// static snake body
const snakeBody = [
  getCoord(snakeDefaultCoord[0], snakeDefaultCoord[1]),
  getCoord(snakeDefaultCoord[0] - 1, snakeDefaultCoord[1]),
  getCoord(snakeDefaultCoord[0] - 2, snakeDefaultCoord[1]),
];

const addHead = () => snakeBody[0].classList.add("snake-head");
const removeHead = () => snakeBody[0].classList.remove("snake-head");

const addBody = (i) => snakeBody[i].classList.add("snake-body");
const removeBody = (f) => snakeBody[f].classList.remove("snake-body");

for (let i = 0; i < snakeBody.length; i++) {
  addBody(i);
}
addHead();

let food;

// Create colors of food
const colorsOfFood = ["#FAEBD7", "#00FFFF", "#BDB76B", "#8FBC8F", "#DAA520"];

const getRandomColorOfFood = () =>
  Math.floor(Math.random() * colorsOfFood.length);

const createFood = () => {
  let randFoodCoord = getRandomCoord();

  food = getCoord(randFoodCoord[0], randFoodCoord[1]);

  while (food.classList.contains("snake-body")) {
    let randFoodCoord = getRandomCoord();

    food = getCoord(randFoodCoord[0], randFoodCoord[1]);
  }

  (function getFoodContentStyles() {
    food.textContent = "★";
    food.style.background = colorsOfFood[getRandomColorOfFood()];
    food.style.color = "red";
    food.style.display = "flex";
    food.style.justifyContent = "center";
    food.style.alignItems = "center";
    food.style.fontSize = "42px";
    food.style.fontWeight = "700";
    food.style.border = "3px solid red";
    food.style.borderRadius = "7px";
  })();
};

let direction = "right";
let steps = false;

const pScores = document.createElement("p");
document.body.appendChild(pScores);

pScores.style.cssText = `
  font-size: 20px;
  font-weight: 700;
  display: block;
`;

let score = 0;
pScores.textContent = `Your scores: ${score}`;

const moveSnake = () => {
  const snakeCoord = [
    snakeBody[0].getAttribute("posX"),
    snakeBody[0].getAttribute("posY"),
  ].map((el) => +el);

  removeHead();
  removeBody(snakeBody.length - 1);
  snakeBody.pop();

  const getUnshiftedCoord = (x, y) =>
    snakeBody.unshift(document.querySelector(`[posX ="${x}"][posY ="${y}"]`));

  if (direction === "right") {
    if (snakeCoord[0] < 10) {
      getUnshiftedCoord(snakeCoord[0] + 1, snakeCoord[1]);
    } else {
      getUnshiftedCoord(1, snakeCoord[1]);
    }
  }
  if (direction === "left") {
    if (snakeCoord[0] > 1) {
      getUnshiftedCoord(snakeCoord[0] - 1, snakeCoord[1]);
    } else {
      getUnshiftedCoord(10, snakeCoord[1]);
    }
  }
  if (direction === "up") {
    if (snakeCoord[1] < 10) {
      getUnshiftedCoord(snakeCoord[0], snakeCoord[1] + 1);
    } else {
      getUnshiftedCoord(snakeCoord[0], 1);
    }
  }
  if (direction === "down") {
    if (snakeCoord[1] > 1) {
      getUnshiftedCoord(snakeCoord[0], snakeCoord[1] - 1);
    } else {
      getUnshiftedCoord(snakeCoord[0], 10);
    }
  }

  if (
    snakeBody[0].getAttribute("posX") === food.getAttribute("posX") &&
    snakeBody[0].getAttribute("posY") === food.getAttribute("posY")
  ) {
    (function removeFoodContentStyles() {
      food.style.background = "";
      food.style.border = "";
      food.style.borderRadius = "";
      food.textContent = "";
    })();

    const getPushiedCoord = (x, y) =>
      snakeBody.push(document.querySelector(`[posX ="${x}"][posY ="${y}"]`));

    let x = snakeBody[snakeBody.length - 1].getAttribute("posX");
    let y = snakeBody[snakeBody.length - 1].getAttribute("posY");

    getPushiedCoord(x, y);
    createFood();
    score++;
    pScores.textContent = `Your scores: ${score}`;
  }

  const gameOver = () => {
    if (snakeBody[0].classList.contains("snake-body")) {
      setTimeout(() => {
        pScores.textContent = `"Game over!" Your scores: ${score}`;
      }, 200);

      clearInterval(interval);
    }

    addHead();
  };
  gameOver();

  for (let i = 0; i < snakeBody.length; i++) {
    addBody(i);
  }

  steps = true;
};

const moveOnKeyDown = () => {
  document.addEventListener("keydown", (event) => {
    if (steps === true) {
      if (event.keyCode === 37 && direction !== "right") {
        direction = "left";
        steps = false;
      } else if (event.keyCode === 38 && direction !== "down") {
        direction = "up";
        steps = false;
      } else if (event.keyCode === 39 && direction !== "left") {
        direction = "right";
        steps = false;
      } else if (event.keyCode === 40 && direction !== "up") {
        direction = "down";
        steps = false;
      }
    }
  });
};
const interval = setInterval(moveSnake, 300);

// Game start
(() => {
  createFood();
  moveSnake();
  moveOnKeyDown();
})();
