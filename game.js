
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(event){
    if (!started && (event.key == "a" || event.key == "A")){
        $("#level-title").text("Level "+level);   
        nextSequence();  
        started = true;
    }
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
        $("#level-title").text("Game Over, Press \"A\" Key to Restart");
        startOver();
    }

}

function startOver(){
    started=false;
    level=0;
    gamePattern = [];
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level); 
    let randomNumber = Math.floor(Math.random()*4);
    let randomeChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomeChosenColour);
    $("#"+randomeChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomeChosenColour);
  
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);

}


function playSound(chosenColour){
    var audio = new Audio("sounds/"+chosenColour+".mp3");
    audio.play();
}