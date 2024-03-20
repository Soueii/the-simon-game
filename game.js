var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  level++;

  for (var i = 0; i < level; i++) {
    $("#level-title").text("Level " + level);
  }

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

function startGame() {
  // nextSequence();
  $("#level-title").text("Level 0");
  $(document).unbind("keyup", startGame);
}

$(document).on("keyup", startGame);
$(document).on("keyup", nextSequence);
