const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
   
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            handleClick(index);
        });
    });
}

initGame();

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
       
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) &&
            (gameGrid[position[1]] === gameGrid[position[2]])) {
           
            answer = gameGrid[position[0]];
            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    
    if (answer !== "") {
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.classList.add("active");
       
        boxes.forEach(box => box.removeEventListener("click", handleClick));
       
        boxes.forEach(box => box.style.pointerEvents = "none");
    } else {
      
        if (!gameGrid.includes("")) {
            gameInfo.innerText = "tie";
            newGameBtn.classList.add("active");
            
            boxes.forEach(box => box.removeEventListener("click", handleClick));
           
            boxes.forEach(box => box.style.pointerEvents = "none");
        }
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
       
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
       
        checkGameOver();
        if (!newGameBtn.classList.contains("active")) {
            
            swapTurn();
        }
    }
}


newGameBtn.addEventListener("click", initGame);
