const mongoose = require("mongoose");
const { Schema } = mongoose;

const betSchema = new Schema({
  amount: Number,
  comment: String,
  dateCreated: Date,
  accepted: String,
  againstEmail: String,
  againstId: String,
  endDate: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
});

mongoose.model("bets", betSchema);
