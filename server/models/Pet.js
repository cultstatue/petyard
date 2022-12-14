const praiseSchema = require("./Praise");
const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
    },
    praises: [praiseSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

petSchema.virtual("praiseCount").get(function () {
  return this.praises.length;
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
