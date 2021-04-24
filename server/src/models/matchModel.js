const mongoose = require("mongoose");

// Define my schema, what match/player should look like
const matchSchema = mongoose.Schema({
  nameOne: String,
  cityOne: String,
  nameTwo: String,
  cityTwo: String,
 
});
// Export model to be used by the match router
module.exports = mongoose.model("match", matchSchema);
