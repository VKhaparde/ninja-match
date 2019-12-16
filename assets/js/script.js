$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;

function initializeApp() {

  $("body").on("click", function () {
    newAudioElement.play();
  });
  $('.card').on("click", ".card_back", handleCardClick);
  $('.modal_close').on("click", function () {
    $('.modal').addClass("hidden");
    $('.card').on("click", ".card_back", handleCardClick);
    displayResetStats();
  });
  addEventListenersToDomElements();
}
function handleCardClick(event) {
  $(event.currentTarget).addClass('hidden');

  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  }
  else {
    secondCardClicked = $(event.currentTarget);
    var firstCardImage = firstCardClicked.siblings().css("background-image");
    var secondCardImage = secondCardClicked.siblings().css("background-image");

    if (firstCardImage === secondCardImage) {
      attempts = attempts + 1;
      matches = matches + 1;
      firstCardClicked = null;
      secondCardClicked = null;
      displayStats();
    }
    else {
      //use setTimeout to call a function
      //in that function, remove the class hidden
      //set both first and second cardClicked to null
      attempts = attempts + 1;
      $('body').addClass('no_events');
      displayStats();
      setTimeout(function () {
        firstCardClicked.removeClass("hidden");
        secondCardClicked.removeClass("hidden");
        firstCardClicked = null;
        secondCardClicked = null;
        $('body').removeClass('no_events');
      }, 1000);
    }
  }
}
function calculateAccuracy() {
  var resultObj = {};
  if (attempts <= 12 && matches === max_matches) {
    $('.modal').removeClass('hidden');
    $('.modal_text').text("Congratulations!! You Win.");
    $('.card').off("click");
    games_played = games_played + 1;
  }
  else if (attempts === 12) {
    $('.modal').removeClass('hidden');
    $('.modal_text').text("Sorry!! Try again.").removeClass("hidden");
    $('.card').off("click");
    games_played = games_played + 1;
  }
  resultObj.games_played = games_played;
  resultObj.attempts = attempts;
  resultObj.accuracy = Math.floor((matches / attempts) * 100);
  return resultObj;
}

function displayStats() {
  var result_to_display = calculateAccuracy();
  $('.games_played_value > p').text(result_to_display.games_played);
  $('.attempts_val > p').text(result_to_display.attempts);
  $('.accuracy_value > p').text(result_to_display.accuracy + "%");
}
function resetStats() {
  var resetResultObj = {};
  matches = 0;
  attempts = 0;
  var accuracy = 0;
  resetResultObj.matches = matches;
  resetResultObj.attempts = attempts;
  resetResultObj.games_played = games_played;
  resetResultObj.accuracy = accuracy;
  return resetResultObj;
}
function displayResetStats() {
  var display_reset_stats = resetStats();
  $('.games_played_value > p').text(display_reset_stats.games_played);
  $('.attempts_val > p').text(display_reset_stats.attempts);
  $('.accuracy_value > p').text(display_reset_stats.accuracy + "%");
  $('.card_back').removeClass("hidden");
}

var newAudioElement = new Audio();
newAudioElement.src = '../ninja-match/assets/images/my_images/Ninjago_Overture.mp3';

function addEventListenersToDomElements() {
  $(".start_sound").on('click', hideModalAndShowSounds);
}
function hideModalAndShowSounds() {
  hideModal();
  initiateSoundPlayer();
}
function hideModal() {
  $("#play_sound").addClass('hidden');
}
function initiateSoundPlayer() {
  $("#playAgain").addClass('hidden');
  $("#display").text('loading audio');
  var player = new Audio();
  player.src = 'ninja-match/assets/images/my_images/Ninjago_Overture.mp3';
  player.addEventListener('canplaythrough', playSound);

  player.load();
}
function playSound() {
  this.play();
}
$(function () {
  var parent = $(".container");
  var divs = parent.children();
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }
});
