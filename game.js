var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).on("keyup", function () {
  if (!started) {
    gamePattern = [];
    level = 0;
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // console.log(userClickedPattern);
  playSound(userChosenColour);

  //начин за получаване на индекса на последния елемент в масив
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

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

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    started = false;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press a Key to Restart");
  }
}
