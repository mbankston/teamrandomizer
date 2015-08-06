var numGroups = 0;
var gammaArray = [];



function shuffleGamma(array) {
    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};
function buttonCreator() {
    for (var i = 2; i < 12; i++){
        $('.buttonContainer').append('<button class=groupButton data-number="'+i+'">'+i+'</button>');
    }
    $('.buttonContainer').append('<button class="randomize">randomize</button>');
}
function splitTeams (array) {
    //clears all teams
    $('groups').children().remove();
    for (var i = 1; i <= numGroups; i++) {
        $('.groups').append('<div class="teams' + i + '">Team: ' +(i)+ '</div>');
        //minteamsize
    }
    var groupIndex = 1;
    for (var j = 0; j < array.length; j++) {
        $('.teams' + groupIndex).append('<p>' + gammaArray[j] + '</p>');
        $('.teams' + groupIndex + ' p').last().hide().delay(400*j).slideDown();
        if (groupIndex < numGroups) {
            groupIndex++;
        } else {
            groupIndex = 1;
        }
    }
}
$(document).ready(function (){
    $.ajax({
        url: "/data",
        success: function(data){
            console.log(data);
            buttonCreator();
            $.each(data, function() {
                gammaArray.push(this.name);
            });
        }
    });
    $('body').on('click','.groupButton', function() {
        numGroups = $(this).data("number");
        console.log(numGroups);
    });
    $('body').on('click','.randomize', function() {
        shuffleGamma(gammaArray);
        console.log(gammaArray);
        splitTeams(gammaArray);
    });
});
