const { Schema } = require("mongoose");

const praiseSchema = new Schema({
  praiseText: {
    type: String,
    required: true,
  },
  totalPraises: {
    type: Number,
  },
});

module.exports = praiseSchema;
