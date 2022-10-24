const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Status } = require("../models");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate("pets")
          .populate("status");

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().populate("status");
    },
    otherUser: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("pets")
        .populate("status");
    },
    pets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pet.find(params);
    },
    pet: async (parent, { _id }) => {
      const params = _id;
      return Pet.findById(params);
    },
    status: async (parent, { username }) => {
      const params = username ? { username } : {};
      console.log(params);
      return Status.find(params);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addPet: async (parent, args, context) => {
      console.log("in addPet mutation");
      if (context.user) {
        const pet = await Pet.create({
          ...args,
          username: context.user.username,
        });
        console.log("pet created : " + pet);
        console.log("attempting to update user...");
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              pets: pet,
            },
          },
          { new: true }
        );
        console.log("user should be updated");
        return pet;
      }

      throw new AuthenticationError("Not logged in");
    },

    updatePet: async (parent, args, context) => {
      if (context.user) {
        const updatedPet = await Pet.findOneAndUpdate(
          { _id: args.petId },
          {
            name: args.name,
            age: args.age,
            gender: args.gender,
            breed: args.breed,
          },
          { new: true }
        );

        return updatedPet;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    deletePet: async (parent, { petId }, context) => {
      if (context.user) {
        const deletedPet = await Pet.findByIdAndRemove({ _id: petId });

        return deletedPet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //Note: WE only want one status per user to be created, then continuously updated
    addStatus: async (parent, args, context) => {
      if (context.user) {
        const status = await Status.create({
          ...args,
          username: context.user.username,
        });
        console.log(status);
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { status: status._id },
          { new: true }
        );
        return status;
      }
      throw new AuthenticationError("you need to be logged in!");
    },
    updateStatus: async (parent, { statusId, statusText }, context) => {
      console.log(context);
      if (context.user) {
        console.log(context.status);
        const status = await Status.findByIdAndUpdate(
          { _id: statusId },
          { statusText: statusText },
          { new: true }
        );
        return status;
      }
      throw new AuthenticationError("you need to be logged in!");
    },
    addComment: async (parent, { statusId, commentText }, context) => {
      if (context.user) {
        const updatedStatus = await Status.findOneAndUpdate(
          { _id: statusId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true }
        );
        return updatedStatus;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { statusId, _id }, context) => {
      if (context.user) {
        const deletedComment = await Status.findOneAndUpdate(
          { _id: statusId },
          {
            $pull: {
              comments: { _id: _id },
            },
          },
          { new: true }
        );
        return deletedComment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
