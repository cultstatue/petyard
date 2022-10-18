const db = require("./connection");
const { User, Pet, Comment, Status, Praise } = require("../models");
const commentSchema = require("../models/Comment");

db.once("open", async () => {
  await Status.deleteMany();

  const status = await Status.insertMany([
    {
      statusText: "Feeling like buying my cat a halloween outfit",
      username: "pam",
      comments: [
        {
          commentText: "I want to buy costumes too!",
          username: "john",
        },
        {
          commentText: "Cool page!",
          username: "holty",
        },
      ],
    },
    {
      statusText: "My dog ate my homework",
      username: "holty",
      comments: [
        {
          commentText: "I love your pet!",
          username: "pam",
        },
        {
          commentText: "You have so many pets",
          username: "john",
        },
      ],
    },
  ]);

  console.log("status seeded");

  await Pet.deleteMany();

  const pets = await Pet.insertMany([
    {
      username: "pam",
      name: "spike",
      breed: "bulldog",
      age: 3,
      gender: "male",
      praises: [
        {
          username: "holty",
          praiseText: "what a good boy!",
        },
        {
          username: "john",
          praiseText: "You deserve a treat!",
        },
      ],
    },
    {
      username: "pam",
      name: "princess",
      breed: "chihuahua",
      age: 8,
      gender: "female",
      praises: [
        {
          username: "holty",
          praiseText: "what a good gitl!",
        },
        {
          username: "john",
          praiseText: "You deserve a spa day!",
        },
      ],
    },
    {
      username: "holt",
      name: "benji",
      breed: "golden retriever",
      age: 5,
      gender: "male",
      praises: [
        {
          username: "pam",
          praiseText: "what a pretty boy!",
        },
        {
          username: "john",
          praiseText: "You deserve a anything!!",
        },
      ],
    },
  ]);

  console.log("Pets seeded");

  await User.deleteMany();

  await User.create({
    username: "pam",
    email: "pamela@testmail.com",
    password: "password12345",
    status: status[0],
    pets: [pets[0]._id, pets[1]._id],
  });

  await User.create({
    username: "holty",
    email: "eholt@testmail.com",
    password: "password12345",
    status: status[1],
    pets: [pets[2]._id],
  });
  await User.create({
    username: "johnny",
    email: "john@testmail.com",
    password: "password12345",
  });
  console.log("users seeded");
  process.exit();
});
