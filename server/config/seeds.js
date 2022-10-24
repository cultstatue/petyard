const db = require("./connection");
const { User, Pet, Comment, Status, Praise } = require("../models");
const commentSchema = require("../models/Comment");

db.once("open", async () => {
  await Status.deleteMany();

  const status = await Status.insertMany([
    {
      statusText: "Feeling like buying my cat a halloween outfit",
      username: "pam",
    },
    {
      statusText: "My dog ate my homework",
      username: "holty",
    },
  ]);

  console.log("status seeded");

  await Pet.deleteMany();

  const pets = await Pet.insertMany([
    {
      username: "pam",
      image: "dog.gif",
      name: "spike",
      species: "dog",
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
      image: "cat.gif",
      species: "cat",
      breed: "domestic-shorthair",
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
      image: "dog2.gif",
      species: "dog",
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
    profile_img: "GnollBrute_Idle_1.png",
    email: "eholt@testmail.com",
    password: "password12345",
    status: status[1],
    pets: [pets[2]._id],
  });
  await User.create({
    username: "user3",
    email: "user3@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user4",
    profile_img: "GnollBrute_Idle_1.png",
    email: "user4@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user5",
    email: "user5@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user6",
    email: "user6@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user7",
    profile_img: "GnollBrute_Idle_1.png",
    email: "user7@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user8",
    email: "user8@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user9",
    profile_img: "GnollBrute_Idle_1.png",
    email: "user9@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "user10",
    email: "user10@mail.com",
    password: "password12345",
  });
  await User.create({
    username: "johnny",
    email: "john@testmail.com",
    password: "password12345",
  });
  console.log("users seeded");
  process.exit();
});
