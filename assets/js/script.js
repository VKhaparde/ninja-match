$(document).ready(initializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;

function initializeApp(){
$('.card').on("click",'.card_back',handleCardClick);
}
function handleCardClick(event){
  console.log(event);
  console.log(event.currentTarget);
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
      matches = matches + 1;
      firstCardClicked = null;
      secondCardClicked = null;
    }
    else {
      //use setTimeout to call a function
        //in that function, remove the class hidden
        //set both first and second cardClicked to null
        setTimeout(function(){
          firstCardClicked.removeClass("hidden");
          secondCardClicked.removeClass("hidden");
          firstCardClicked = null;
          secondCardClicked = null;
        },1500);
    }
    if (matches === max_matches) {
      $('.modal').removeClass("hidden");
      $('.modal_close').removeClass("hidden");
      $('.modal_close').on("click",function(){
        $('.modal').addClass("hidden");
      });
    }
  }

}
