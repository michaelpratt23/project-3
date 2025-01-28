const { User, Task } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      return User.find().populate("tasks");
    },
    // Fetch a single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("tasks");
    },
    // Fetch all tasks
    tasks: async () => {
      return Task.find().populate("user");
    },
    // Fetch a single task by ID
    task: async (parent, { taskId }) => {
      return Task.findById(taskId).populate("user");
    },
  },
  Mutation: {
    // Add a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    // Add a new task
    addTask: async (parent, { title, description, dueDate }, context) => {
      if (context.user) {
        const task = await Task.create({
          title,
          description,
          dueDate,
          user: context.user._id,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { tasks: task._id } },
          { new: true }
        );

        return task;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Update an existing task
    updateTask: async (
      parent,
      { taskId, title, description, status, dueDate },
      context
    ) => {
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: taskId, user: context.user._id },
          { title, description, status, dueDate },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // Delete a task
    deleteTask: async (parent, { taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({
          _id: taskId,
          user: context.user._id,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { tasks: task._id } },
          { new: true }
        );

        return task;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
