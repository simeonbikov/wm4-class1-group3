const gameCanvas = document.getElementById("game-canvas");
const canvas = document.createElement("canvas");
canvas.setAttribute("height", "480");
canvas.setAttribute("width", "640");
//canvas.style.position = "absolute";
canvas.style.top = "300px";
// canvas.style.top = window.innerHeight / 2 - canvas.height / 2 + "px";
canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + "px";
canvas.style.border = "1px solid #000";
canvas.style.backgroundColor = "#ffd500";
// canvas.style.backgroundColor = "#ffd500";
//document.body.prepend(canvas);
gameCanvas.prepend(canvas);

const ctx = canvas.getContext("2d");

const lettersMade = [];
let lettersCounter = 7;
const amountOfDisplayedLetters = 15;
const clickTracker = [];
const words = ["APPLE", "TOY", "BALL", "BIKE", "RAINBOW"];
let word = "";
const game = { requestAnim: "", score: 0 };

canvas.addEventListener("click", (e) => {
  const rectangle = canvas.getBoundingClientRect();
  const mouseClick = {
    x: e.clientX - rectangle.left,
    y: e.clientY - rectangle.top,
    size: 10,
  };
  clickTracker.push(mouseClick);
});

function collisionCheck(lett, dot) {
  let isHit =
    lett.x < dot.x + dot.size &&
    lett.x - lett.size + 10 + lett.size > dot.x &&
    lett.y - lett.size - 10 < dot.y + dot.size &&
    lett.y + lett.size > dot.y;
  return isHit;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (lettersMade.length < lettersCounter) {
    letterMaker();
  }

  clickTracker.forEach((dot, index) => {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    dot.size -= 1;
    if (dot.size < 1) {
      clickTracker.splice(index, 1);
    }
  });
  lettersMade.forEach((lett, index) => {
    lett.y += lett.speed;
    lett.x -= Math.random() * 2 - 1; // moving left/right
    if (lett.y > canvas.height + lett.size) {
      let temp1 = lettersMade.splice(index, 1);
      if (lettersCounter < amountOfDisplayedLetters) {
        lettersCounter += 2;
      }
      // console.log(lettersMade.length);
    }
    clickTracker.forEach((dot) => {
      if (collisionCheck(lett, dot)) {
        let temp2 = lettersMade.splice(index, 1);
        if (lettersCounter < amountOfDisplayedLetters) {
          lettersCounter += 2;
        }
        // console.log(lettersMade.length);

        if (word.includes(lett.letter)) {
          word = word.replace(lett.letter, "");
          game.score--;
          if (game.score === 0) {
            alert("Congratulations! You got the word!");
            document.location.reload();
            clearInterval(interval); // for Chrome to end game
          }
        }
      }
    });
    drawLetter(lett.x, lett.y, lett.size, lett.letter, lett.color);
  });
  //score area:
  game.score = word.length;
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.fillRect(canvas.width / 2 - 120, 13, 240, 40);
  ctx.beginPath();
  ctx.fillStyle = "#ffd500";
  ctx.font = "24px serif";
  ctx.textAlign = "center";
  let startBtn = `LETTERS LEFT: ${game.score}`;
  ctx.fillText(startBtn, canvas.width / 2, 40);

  game.requestAnim = requestAnimationFrame(draw);
}

function letterMaker() {
  const lettersList = words.join("");
  const colorsLetterList = ["#e01e37", "#3f37c9", "#7209b7", "#008000"];
  let randomLetter =
    lettersList[Math.floor(Math.random() * lettersList.length)];
  let randomColor =
    colorsLetterList[Math.floor(Math.random() * colorsLetterList.length)];
  let letterSize = Math.random() * 60 + 40;
  let letterSpeed = Math.random() * 1.5;
  let xPosition = Math.random() * (canvas.width - letterSize);
  let yPosition = Math.random() * (0 - letterSize);

  lettersMade.push({
    x: xPosition,
    y: yPosition,
    size: letterSize,
    speed: letterSpeed,
    letter: randomLetter,
    color: randomColor,
  });
}

function drawLetter(xPosition, yPosition, letterSize, randomLetter, randomColor) {
  ctx.font = "bold " + letterSize + "px serif";
  ctx.fillStyle = randomColor;
  ctx.fillText(randomLetter, xPosition, yPosition);
}

// game.requestAnim = requestAnimationFrame(draw);

function startGame() {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(canvas.width/2 -120, canvas.height/2 -40, 240, 40);
  ctx.beginPath();
  ctx.fillStyle = "#ffd500";
  ctx.font = "24px serif";
  ctx.textAlign = "center";
  let startTxt = "START";
  ctx.fillText(startTxt, canvas.width/2, canvas.height/2 -12, 400);

  canvas.addEventListener("click", oneClick);
  function oneClick() {
    this.removeEventListener("click", oneClick);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    startIntro();
  }
}

function startIntro() {
  word = words[Math.floor(Math.random() * words.length)];
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, canvas.height / 2 - 40, canvas.width, 40);
  ctx.beginPath();
  ctx.fillStyle = "#ffd500";
  ctx.font = "24px serif";
  ctx.textAlign = "center";
  let introTxt = `Remember this word: "${word}"`;
  ctx.fillText(introTxt, canvas.width / 2, canvas.height / 2 - 12, 400);

  canvas.addEventListener("click", oneClick);
  function oneClick() {
    this.removeEventListener("click", oneClick);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.requestAnim = requestAnimationFrame(draw);
  }
}

startGame();
