

userClickedPattern = [];
gamePattern = [];
buttonColors = ["red", "blue", "yellow", "green"];
var level = 0;
count = 0;

// random buttons

document.addEventListener("keydown", nextSequence);

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;
  var level1 = document.querySelector("h1").innerHTML = ("Level " + level);
  var flash = document.querySelector("." + randomChosenColor);
  flash.classList.add("pressed");
  setTimeout(function() {
    flash.classList.remove("pressed");
  }, 100);
  var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
  audio.play();
  document.removeEventListener("keydown", nextSequence);
}

// pressed buttons

for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
  var waitClick = document.querySelectorAll(".btn")[i].addEventListener("click", pressButton);

  function pressButton() {
    var activeButton = this;
    activeButton.classList.add("pressed");
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 100);
    var press = new Audio('sounds/' + activeButton.classList[0] + '.mp3');
    var userChosenColor = activeButton.classList[0];
    userClickedPattern.push(userChosenColor);

    if (gamePattern.length === userClickedPattern.length && gamePattern.join(',') === userClickedPattern.join(',')) {
      userClickedPattern = [];
      press.play();
      setTimeout(function() {
        nextSequence()
      }, 1000);
      count = 1;
    } else if (gamePattern.length > userClickedPattern.length && userClickedPattern.join(',') === gamePattern.slice(0, count).join(',')) {
      count++;
      press.play();
      waitClick;
    } else {
      document.querySelector('body').classList.add("game-over");
      setTimeout(function() {
      document.querySelector('body').classList.remove("game-over");
      }, 100);
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      start = document.querySelector("h1").innerHTML = ("Game over, press any key to restart!");
      userClickedPattern = [];
      gamePattern = [];
      buttonColors = ["red", "blue", "yellow", "green"];
      level = 0;
      count = 0;
      document.addEventListener("keydown", nextSequence);
    }
  }
}


// userClickedPattern.pop(userChosenColor);
// console.log(userClickedPattern);
