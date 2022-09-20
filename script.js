class circle {
  constructor(xCenter, yCenter, letter, number) {
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.letter = letter;
    this.number = number;
  }
  createButton() {
    let btn = document.createElement("button");
    btn.innerHTML = this.letter;
    btn.style.position = "absolute";
    btn.style.top = this.xCenter + "px";
    btn.style.left = this.yCenter + "px";
    btn.style.width = 100 + "px";
    btn.style.height = 100 + "px";
    btn.id = "btn" + this.number;
    document.getElementById("myBox").appendChild(btn);

    let buttonId = "btn" + this.number;
    let element = document.getElementById(buttonId);
    element.onclick = function (e) {
      e.preventDefault();
      myClick(btn.id);
    };
    // custom code
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// console.log(document.getElementById("myBox").style.width);
function startGame() {
  for (let num = 0; num < 31; num++) {
    let xRandom = Math.random() * 900;
    let yRandom = Math.random() * 900;
    const randomCharacter =
      alphabet[Math.floor(Math.random() * alphabet.length)];
    let myCircle = new circle(xRandom, yRandom, randomCharacter, num);
    myCircle.createButton();
  }
}
let correctClick = 0;
let inCorrectClick = 0;
function myClick(x) {
  let buttonLetter = document.getElementById(x).innerHTML;
  let myWord = document.getElementById("enteredName").value;
  if (myWord.toUpperCase().includes(buttonLetter.toUpperCase())) {
    correctClick++;
    document.getElementById(x).style.color = "green";
    document.getElementById(x).style.fontSize = "50px";
    document.getElementById("correctspan").innerHTML = correctClick;
    $(document.getElementById(x)).hide(1000);
  } else {
    inCorrectClick++;
    document.getElementById(x).style.color = "red";
    document.getElementById(x).style.fontSize = "50px";
    document.getElementById("incorrectspan").innerHTML = inCorrectClick;
    $(document.getElementById(x)).hide(1000);
  }
}
