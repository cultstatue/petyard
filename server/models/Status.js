const { Schema, model } = require("mongoose");
const commentSchema = require("./Comment");
const dateFormat = require("../utils/dateFormat");
// Status's will be created once, then continuously updated
const statusSchema = new Schema(
  {
    statusText: {
      type: String,
      required: "You need to leave a thought!",
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

statusSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Status = model("Status", statusSchema);

module.exports = Status;
