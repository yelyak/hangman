let currentPlayer = localStorage.getItem("currentPlayer");
let wordsList = []


if (currentPlayer == 1){
  words = localStorage.getItem('playerTwo3words');
}else{
  
  words = localStorage.getItem('playerOne3words');
}

if (words) {
  wordsList = JSON.parse(words);
}

randWordIndex = Math.floor(Math.random() * wordsList.length)
let selectedWord = wordsList[randWordIndex];
console.log(selectedWord);

document.querySelector(".playerTurn").textContent = `Player ${currentPlayer} Guess!`;
let maskedWord = "_ ".repeat(selectedWord.length).trim();
document.getElementById("wordGuess").textContent = maskedWord;

let attempts = 7;
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let keyboard = document.querySelector(".keyboard");

alphabet.forEach(letter => {
  const button = document.createElement("button");
  button.textContent = letter.toUpperCase();
  button.addEventListener("click", () => guessLetter(letter, button));
  keyboard.appendChild(button);
});

function disableKeyboard(){
  const buttons = document.querySelectorAll('.keyboard button');
  buttons.forEach(button => {
      button.disabled = true;

  });
  checkLength();
}

function checkLength(){
  wordsList.splice(randWordIndex, 1);
  console.log("currentPlayer", currentPlayer)
  console.log("wordsList", wordsList)
  
  if (currentPlayer == 1 && wordsList.length === 0) {
    console.log("Determine Winner")
    determineWinner()
  }else{
    document.getElementById("nextWord").addEventListener("click", () => location.reload());
      document.getElementById("nextWord").style.display = "block";


      if (currentPlayer == 1){
        localStorage.setItem("playerTwo3words", JSON.stringify(wordsList));
        console.log(wordsList)
      }
      else{
        localStorage.setItem("playerOne3words", JSON.stringify(wordsList));
          console.log(wordsList)
      }

      if (wordsList.length === 0){
        localStorage.setItem("currentPlayer", 1);
        console.log("Change to player 1")
      }
    }

    if (wordsList.length === 0) {
      saveAttempts();
      if (currentPlayer == 1) {
        localStorage.setItem("currentPlayer", 2);
        location.reload();
      } else {
        determineWinner();
      }
  }
  
}



function savingAttempts() {
  let attemptsLeft = localStorage.getItem(`player${currentPlayer}Attempts`) || 0;
  attemptsLeft = parseInt(attemptsLeft) + attempts;
  localStorage.setItem(`player${currentPlayer}Attempts`, attemptsLeft);
}

function determineWinner() {
  let player1Attempts = parseInt(localStorage.getItem('player1Attempts')) || 0;
  let player2Attempts = parseInt(localStorage.getItem('player2Attempts')) || 0;
  
  if (player1Attempts > player2Attempts) {
    document.querySelector(".wordGuess").textContent = `Player 1 wins with ${player1Attempts - player2Attempts} more attempts left!`;
  } else if (player2Attempts > player1Attempts) {
    document.querySelector(".wordGuess").textContent = `Player 2 wins with ${player2Attempts - player1Attempts} more attempts left!`;
  } else {
    document.querySelector(".wordGuess").textContent = `It's a tie! Both players have ${player1Attempts} attempts left!`;
  }
  //bug :()
  document.getElementById("playAgain").style.display = "block";
  localStorage.clear();
}

function guessLetter(letter, button) {
  button.disabled = true;

  if (selectedWord.includes(letter)) {
    button.classList.add("correct");

    // uoqwjkskdl
    let newMaskedWord = maskedWord.split(" ");
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        newMaskedWord[i] = letter;
      }
    }


    maskedWord = newMaskedWord.join(" ");
    document.getElementById("wordGuess").textContent = maskedWord;
    // check if you win the game
    if (!maskedWord.includes("_")){
      document.querySelector(".wordGuess").textContent =
        'Congratulations! You won the game! The word was: ' + selectedWord;''
      disableKeyboard()
      savingAttempts()
    }
  } else {
    button.classList.add("incorrect");
    attempts--;
  if (attempts > 0){
    document.getElementById("hangmanImg").src = `images/hangman${7 - attempts + 1}.png`;
  }

    //scoreboardsadasd
    document.querySelector(".scoreBoard").textContent = `Number of Attempts: ${attempts}`;
    if (attempts == 0){
      disableKeyboard()
      savingAttempts()
      document.querySelector(".wordGuess").textContent =
        'Game Over! The word was: ' + selectedWord;''
        checkLength()
        

    }
  }
}
// button html change to next player
//js 2 button
//scoresboard, who wins
//refresh=> local stroage
//score __;^
//not ugly 