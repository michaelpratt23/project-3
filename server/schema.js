const { gql } = require("graphql-tag");
const { User, Task } = require("./model");
const { signToken } = require("./auth");

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
  }

  type Task {
    _id: ID
    title: String!
    description: String
    status: String
    owner: User
    collaborators: [User]
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    tasks: [Task]
  }

  type Mutation {
    signup(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createTask(title: String!, description: String): Task
    inviteCollaborator(taskId: ID!, email: String!): Task
  }
`;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new Error("Not authenticated");
    },
    tasks: async (parent, args, context) => {
      if (context.user) {
        return Task.find({
          $or: [
            { owner: context.user._id },
            { collaborators: context.user._id },
          ],
        });
      }
      throw new Error("Not authenticated");
    },
  },
  Mutation: {
    signup: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error("Invalid credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    createTask: async (parent, { title, description }, context) => {
      if (context.user) {
        return Task.create({
          title,
          description,
          owner: context.user._id,
        });
      }
      throw new Error("Not authenticated");
    },
    inviteCollaborator: async (parent, { taskId, email }, context) => {
      if (context.user) {
        const userToInvite = await User.findOne({ email });
        if (!userToInvite) {
          throw new Error("User not found");
        }
        const task = await Task.findById(taskId);
        if (!task || task.owner.toString() !== context.user._id) {
          throw new Error("Not authorized");
        }
        task.collaborators.push(userToInvite._id);
        await task.save();
        return task;
      }
      throw new Error("Not authenticated");
    },
  },
};

module.exports = { typeDefs, resolvers };
