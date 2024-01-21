console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let singlePlayerMode = true;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Function to check for a win or draw
const checkGameStatus = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    // Check for a win
    for (let e of wins) {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            document.getElementById("reset").style.display = "block";
            return;
        }
    }

    // Check for a draw
    let isDraw = Array.from(boxtext).every(element => element.innerText !== '');
    if (isDraw && !isgameover) {
        document.querySelector('.info').innerText = "IT'S A DRAW!";
        isgameover = true;
        document.getElementById("reset").style.display = "block";
    }
};

// Function to make AI move
const makeAIMove = () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    let emptyBoxes = Array.from(boxtexts).filter(element => element.innerText === '');
    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        emptyBoxes[randomIndex].innerText = "O";
        turn = "X";
        audioTurn.play();
        checkGameStatus();
        if (!isgameover) {
            document.querySelector('.info').innerText = "Turn for " + turn;
        }
    }
};

// Function to handle player move
const handlePlayerMove = (boxtext) => {
    if (boxtext.innerText === '' && !isgameover) {
        boxtext.innerText = turn;
        audioTurn.play();
        checkGameStatus();
        if (!isgameover) {
            turn = changeTurn();
            document.querySelector('.info').innerText = "Turn for " + turn;
            if (singlePlayerMode) {
                setTimeout(makeAIMove, 500);
            }
        }
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (singlePlayerMode && turn === "X") {
            handlePlayerMove(boxtext);
        } else if (!singlePlayerMode) {
            handlePlayerMove(boxtext);
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.getElementById("reset").style.display = "none";
});

// Add onclick listener to change mode buttons
document.getElementById("singlePlayerMode").addEventListener('click', () => {
    singlePlayerMode = true;
    reset.click();
    document.querySelector('.info').innerText = "Turn for " + turn;
});

document.getElementById("twoPlayerMode").addEventListener('click', () => {
    singlePlayerMode = false;
    reset.click();
    document.querySelector('.info').innerText = "Turn for " + turn;
});
