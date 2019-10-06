$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts =0;
var games_played = 0;

function initializeApp(){
$('.card').on("click",'.card_back',handleCardClick);
  $('.modal_close').on("click", function () {
    $('.modal').addClass("hidden");
    displayResetStats();
  });
}
function handleCardClick(event){
  // console.log(event);
  // console.log(event.currentTarget);
  $(event.currentTarget).addClass('hidden');

  if(firstCardClicked === null){
    firstCardClicked = $(event.currentTarget);
  }
  else{
    secondCardClicked = $(event.currentTarget);
    var firstCardImage = firstCardClicked.siblings().css("background-image");
    var secondCardImage = secondCardClicked.siblings().css("background-image");
    console.log(secondCardImage);

    if (firstCardImage === secondCardImage) {
      console.log("cards match!!");
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
        displayStats();
        setTimeout(function(){
          firstCardClicked.removeClass("hidden");
          secondCardClicked.removeClass("hidden");
          firstCardClicked = null;
          secondCardClicked = null;
        },1500);
    }
    // if (matches === max_matches) {
    //   $('.modal').removeClass("hidden");
    //   $('.modal_close').removeClass("hidden");

    // }
  }
}
function calculateAccuracy(){
  var resultObj = {};
  if (attempts <= 10 && matches === max_matches){
    $('.modal').removeClass('hidden');
    $('.modal_text').text("Congratulations!! You Win.");
    games_played = games_played + 1;

  }
  else if(attempts === 10){
    $('.modal').removeClass('hidden');
    $('.modal_text').text("Sorry!! Try again?").removeClass("hidden");
    games_played = games_played + 1;
  }
  resultObj.games_played = games_played;
  resultObj.attempts = attempts;
  resultObj.accuracy = Math.floor((matches / attempts) * 100);
  console.log(resultObj);
  return resultObj;
}

function displayStats(){
var result_to_display = calculateAccuracy();
  $('.games_played_value').text(result_to_display.games_played);
  $('.attempts_val').text(result_to_display.attempts);
  $('.accuracy_value').text(result_to_display.accuracy+"%");
}
function resetStats(){
  var resetResultObj ={};
  matches = 0;
  attempts = 0;
  var accuracy = 0;
  resetResultObj.matches = matches;
  resetResultObj.attempts = attempts;
  resetResultObj.games_played = games_played;
  resetResultObj.accuracy = accuracy;
  return resetResultObj;
}
function displayResetStats(){
  var display_reset_stats = resetStats();
  $('.games_played_value').text(display_reset_stats.games_played);
  $('.attempts_val').text(display_reset_stats.attempts);
  $('.accuracy_value').text(display_reset_stats.accuracy+"%");
  $('.card_back').removeClass("hidden");
}
