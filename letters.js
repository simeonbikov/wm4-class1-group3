//create canvas:
const canvas = document.createElement("canvas");
canvas.setAttribute("height", "480");
canvas.setAttribute("width", "640");
canvas.style.backgroundColor = "yellow";
document.body.prepend(canvas);
const ctx = canvas.getContext("2d");
const game = {requestAnim: ""};
const letterMade = {numberOfGeneratedLetters: 50, speed: 1, lettersMade: []};
const clickTracker = [];

canvas.addEventListener('click', (e) => {
    const rectangle = canvas.getBoundingClientRect();
    const mouseClick = {
      x: e.clientX - rectangle.left,
      y: e.clientY - rectangle.top,
      size: 15,
    };
    clickTracker.push(mouseClick);
      
    // letterMade.lettersMade.forEach((letter, index) => {
    //   if (collisionCheck(letter, mouseClick)) {
    //     letterMade.lettersMade.splice(index, 1);
    //   }
    // });

    // 

    //console.log(mouseClick);
    // console.log(e.clientX);
    // console.log(e.clientY);
    // console.log(rectangle.top);
    // console.log(rectangle.left);
});

function collisionCheck(lett, mouseDot) {
    let isHit = lett.x < mouseDot.x + mouseDot.size && lett.x + lett.size > mouseDot.x && lett.y < mouseDot.y + mouseDot.size && lett.y + lett.size > mouseDot.y;
    if (isHit) {
        console.log(lett);
        console.log(mouseDot);
    }
    return isHit;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (letterMade.lettersMade.length < letterMade.numberOfGeneratedLetters) {
      // create new letter:
      letterMaker();
    }

    clickTracker.forEach((dot, index) => {
        // ctx.fillStyle = "white";
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        // ctx.fillRect(dot.x, dot.y, dot.size, dot.size);
        ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
        // ctx.fill();
        ctx.stroke();
        dot.size -= 1;
        if (dot.size < 1) {
            clickTracker.splice(index, 1);
        }
    });
    
    letterMade.lettersMade.forEach((lett, index) => {
      lett.y -= letterMade.speed; // speed of letters
      lett.x -= Math.random() * 0.3 - 0.1; // moving left/right
      if (lett.y < 0) {
        let temp = letterMade.lettersMade.splice(index, 1);
        // console.log(temp);
      }
      clickTracker.forEach((dot) => {
        if (collisionCheck(lett, dot)) {
            letterMade.lettersMade.splice(index, 1);
        }
      });
      drawLetter(lett.x, lett.y, lett.size, lett.letter, lett.color);
    });
    game.requestAnim = requestAnimationFrame(draw);
}


function letterMaker() {
    const letters = ["A", "B", "C", "D", "E"];
    const colors = ["red", "green", "blue", "black"];

    const getRandomLetter = (lettersArr) =>
    lettersArr[Math.floor(Math.random() * lettersArr.length)];

    const getRandomColor = (colorsArr) =>
    colorsArr[Math.floor(Math.random() * colorsArr.length)];

    const randomLetter = getRandomColor(colors);
    const randomColor = getRandomLetter(letters);

    let letterSize = Math.random() * 60 + 15;
    let xPosition = Math.random() * (canvas.width - letterSize);
    let yPosition = Math.random() * (canvas.height - letterSize) + canvas.height;

    letterMade.lettersMade.push({
        x: xPosition,
        y: yPosition,
        size: letterSize,
        letter: randomLetter,
        color: randomColor,
    });
}

function drawLetter(xPosition, yPosition, letterSize, randomLetter, randomColor) {
    ctx.font = letterSize + "px serif";
    ctx.fillStyle = randomLetter;
    ctx.fillText(randomColor, xPosition, yPosition);
}

game.requestAnim = requestAnimationFrame(draw);











// const ctx = canvas.getContext("2d");

// const gradient = ctx.createRadialGradient(canvas.width/2,canvas.height/2-20, 20,canvas.width/2,canvas.height/2,50);
// gradient.addColorStop(0, "rgba(0,0,255,0.9)");
// gradient.addColorStop(1, "rgba(255,255,255,0.1)");

// ctx.beginPath();
// ctx.fillStyle = gradient;
// ctx.strokeStyle = "rgba(255,255,255,0.4)";
// ctx.arc(canvas.width/2,canvas.height/2,50,0,Math.PI * 2);
// ctx.fill();      // fill the color whole circle
// ctx.stroke();    // bubble border



//----------------

// //create canvas:
// const canvas = document.createElement("canvas");
// canvas.setAttribute("height", "480");
// canvas.setAttribute("width", "640");
// canvas.style.backgroundColor = "yellow";
// document.body.prepend(canvas);
// const ctx = canvas.getContext("2d");
// const game = {requestAnim: ""};
// const letterMade = {numberOfGeneratedLetters: 50, lettersMade: []};

// // for (let i = 0; i < letterMade.numberOfGeneratedLetters; i++) {
// //   createLetter();
// // }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     if (letterMade.lettersMade.length < letterMade.numberOfGeneratedLetters) {
//       // create new letter:
//       letterMaker();
//     }
//     letterMade.lettersMade.forEach((letter, index) => {
//         letter.y--;
//         drawLetter(letter.x, letter.y, letter.size, letter.letter, letter.color);
//     });
//     game.requestAnim = requestAnimationFrame(draw);
// }

// function letterMaker() {
//     const letters = ["A", "B", "C", "D", "E"];
//     const colors = ["red", "green", "blue", "black"];

//     const getRandomLetter = (lettersArr) =>
//     lettersArr[Math.floor(Math.random() * lettersArr.length)];

//     const getRandomColor = (colorsArr) =>
//     colorsArr[Math.floor(Math.random() * colorsArr.length)];

//     const randomLetter = getRandomColor(colors);
//     const randomColor = getRandomLetter(letters);

//   let letterSize = Math.random() * 60 + 15;
//   let xPosition = Math.random() * (canvas.width - letterSize);
//   let yPosition = Math.random() * (canvas.height - letterSize);

//     letterMade.lettersMade.push({
//         x: xPosition,
//         y: yPosition,
//         size: letterSize,
//         letter: randomLetter,
//         color: randomColor,
//     });
// }

// function drawLetter(xPosition, yPosition, letterSize, randomLetter, randomColor) {
// // get random letter
// //   const letters = ["A", "B", "C", "D", "E"];
// //   const colors = ["red", "green", "blue", "black"];
// //   let letterSize = Math.random() * 60 + 15;
// //   let xPosition = Math.random() * (canvas.width - letterSize);
// //   let yPosition = Math.random() * (canvas.height - letterSize);

// //   const getRandomLetter = (lettersArr) =>
// //   lettersArr[Math.floor(Math.random() * lettersArr.length)];

// //   const getRandomColor = (colorsArr) =>
// //   colorsArr[Math.floor(Math.random() * colorsArr.length)];

//   ctx.font = letterSize + "px serif";
// //   ctx.strokeText("Hello world", 10, 50);
//   ctx.fillStyle = randomLetter;
//   ctx.fillText(randomColor, xPosition, yPosition);
// }

// game.requestAnim = requestAnimationFrame(draw);

//----------------
