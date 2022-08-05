var buttonColors=["red","blue","green","yellow"];

var userClickedPattern=[];
var gamePattern=[];

var level=1;
var started=false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(event){     
    var userChosenColour=event.target.id;            // or we cn use var userChosenColour=$(this).attr("id")
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});




function nextSequence(){
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    $("h1").text("Level "+level);
    level++;
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },50);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }
    else{
        var aud=new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}
