var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log(gamePattern);

  for (var i = 0; i < level; i++) {
    $("#level-title").text("Level " + level);
  }

  level++;

  playSound(randomChosenColour);
}

$(document).on("keyup", function keyAnimation() {
  setTimeout(function () {
    $("#" + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100);
  }, 100);
  $(document).unbind("keyup", keyAnimation);
});

$(".btn").on("click", function () {
  setTimeout(function () {
    $("#" + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100);

    playSound(randomChosenColour);
  }, 1000);
});

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").on("click", function animatePress(currentColour) {
  currentColour = $(this).addClass("pressed");
  setTimeout(function () {
    currentColour.removeClass("pressed");
  }, 100);
});

function startGame() {
  nextSequence();
  $("#level-title").text("Level 0");
  $(document).unbind("keyup", startGame);
}

$(".btn").on("click", function checkAnswer(currentLevel) {
  currentLevel = userClickedPattern.length - 1;
  console.log(currentLevel);

  if (userClickedPattern.length == gamePattern.length) {
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] !== gamePattern[i]) {
        return console.log("wrong");
      } else {
        console.log("success");
      }
    }
  }

  // setTimeout(function () {
  //   nextSequence();
  // }, 1000);
});

$(document).on("keyup", startGame);

$(".btn").on("click", nextSequence);
