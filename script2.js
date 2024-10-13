const wordForm = document.getElementById("wordForm");
const errorMessage = document.querySelector(".errorMessage");

wordForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let regex = /^[a-zA-Z]+$/;
  console.log(regex.test(document.getElementById("playeroneword1").value));
  console.log(regex.test(document.getElementById("playeroneword2").value));
  console.log(regex.test(document.getElementById("playeroneword3").value));
  let playeroneword1 = document.getElementById("playeroneword1").value;
  let playeroneword2 = document.getElementById("playeroneword2").value;
  let playeroneword3 = document.getElementById("playeroneword3").value;

  if (regex.test(playeroneword1) && regex.test(playeroneword2) && regex.test(playeroneword3)){
    const playerOne3words = [];
    playerOne3words.push(playeroneword1);
    playerOne3words.push(playeroneword2);
    playerOne3words.push(playeroneword3);

    localStorage.setItem('playerOne3words', JSON.stringify(playerOne3words));

    console.log(playerOne3words)

    wordForm.style.display = "none";
    wordForm2.style.display = "block";
    errorMessage.style.display = "none";
  }else{
    
    document.getElementById("playeroneword1").value = "";
    document.getElementById("playeroneword2").value = "";
    document.getElementById("playeroneword3").value = "";
    errorMessage.style.display = "block";
    return;
  }

  
});

const wordForm2 = document.getElementById("wordForm2");
wordForm2.addEventListener("submit", function(event) {
  event.preventDefault();
  let regex = /^[a-zA-Z]+$/;

  let playertwoword1 = document.getElementById("playertwoword1").value;
  let playertwoword2 = document.getElementById("playertwoword2").value;
  let playertwoword3 = document.getElementById("playertwoword3").value;


  console.log(regex.test(playertwoword1));
  console.log(regex.test(playertwoword2));
  console.log(regex.test(playertwoword3));
  
  if (regex.test(playertwoword1) && regex.test(playertwoword2) && regex.test(playertwoword3)){

    const playerTwo3words = [];
    playerTwo3words.push(playertwoword1);
    playerTwo3words.push(playertwoword2);
    playerTwo3words.push(playertwoword3);
  
    localStorage.setItem('playerTwo3words', JSON.stringify(playerTwo3words));
    localStorage.setItem('player1Attempts', JSON.stringify(0));
    localStorage.setItem('player2Attempts', JSON.stringify(0));

    console.log(playerTwo3words)
    window.location.href = "2game.html";
    
  }else{
      errorMessage.style.display = "block";
      document.getElementById("playertwoword1").value = "";
      document.getElementById("playertwoword2").value = "";
      document.getElementById("playertwoword3").value = "";
      return;
  }
  localStorage.setItem("currentPlayer", 2);
});


