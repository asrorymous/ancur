const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  rarity: {
    type: String,
    enum: ["common", "rare", "epic", "legendary"],
    required: true,
  },
});

module.exports = mongoose.model("Card", CardSchema);
