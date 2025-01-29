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
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to update a task."
        );
      }

      try {
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          { title, description, status, dueDate },
          { new: true }
        );

        return updatedTask;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Failed to update task.");
      }
    },
    // Delete a task
    deleteTask: async (parent, { taskId }, context) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You must be logged in to delete a task."
        );
      }

      try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Remove the task from the user's task list
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { tasks: taskId } },
          { new: true }
        );

        return deletedTask;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Failed to delete task.");
      }
    },
  },
};

module.exports = resolvers;
