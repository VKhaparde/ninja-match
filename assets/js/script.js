$(document).ready(initializeApp);


function initializeApp(){
$('.card').on("click",'.card_back',handleCardClick);
}
function handleCardClick(event){
console.log(event);
console.log(event.currentTarget);
$(event.currentTarget).addClass('hidden');
}
