const wordList = ["javascript", "html", "css", "python", "java", "ruby", "php", "swift"];
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
console.log(selectedWord);

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
  console.log("hi")
  buttons.forEach(button => {
    console.log("inside for loop")
      button.disabled = true;

  });
  document.getElementById("playAgain").style.display = "block";
  document.getElementById("playAgain").addEventListener("click",() => location.reload());
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
        'Congratulations! You won the game! The word was: ' + selectedWord;
      disableKeyboard()
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
      document.querySelector(".wordGuess").textContent =
        'Game Over! The word was: ' + selectedWord;''
      

    }
    
  }
}

