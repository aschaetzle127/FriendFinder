var friendList = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendList);
  });

  app.post("/api/friends", function(req, res) {
    var newScores = req.body.scores;
    var scoreArray = [];
    var friendCount = 0;
    var match = 0;

    for (var i = 0; i < friendList.length; i++) {
      var scoreVariance = 0;

      for (var j = 0; j < newScores.length; j++) {
        scoreVariance += Math.abs(
          parseInt(friendList[i].scores[j]) - parseInt(newScores[j])
        );
      }
      scoreArray.push(scoreVariance);
    }

    for (var i = 0; i < scoreArray.length; i++) {
      if (scoreArray[i] <= scoreArray[match]) {
        match = i;
      }
    }

    var bestie = friendList[match];
    res.json(bestie);

    friendList.push(req.body);
  });
};
