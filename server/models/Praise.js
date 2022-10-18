const { Schema } = require("mongoose");

const praiseSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  praiseText: {
    type: String,
    required: true,
  },
});

module.exports = praiseSchema;
