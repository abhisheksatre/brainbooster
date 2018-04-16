var GAME_CONST = {
    GAME_TOKEN: "4h4flslgvfvggihmmvi4s4llsffuuv4s",
};

var game = {};

game.getToken = function() {
    kapow.return("success");
}

game.showlead = function(scores) {
    kapow.boards.postScores(scores, function(r) {
      kapow.return(r);
    }, function(error) {
      kapow.return(null, error);
    });
}
