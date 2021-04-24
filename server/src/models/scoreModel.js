const mongoose = require("mongoose");


const scoreSchema = mongoose.Schema({
  score: Number,
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "match",
  },
});
// Export model to be used by the match router
module.exports = mongoose.model("score", scoreSchema);