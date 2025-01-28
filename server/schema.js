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
    me: async (parent, args, context) =>
      context.user ? User.findById(context.user._id) : null,
    tasks: async (parent, args, context) =>
      context.user
        ? Task.find({
            $or: [
              { owner: context.user._id },
              { collaborators: context.user._id },
            ],
          })
        : [],
  },
  Mutation: {
    signup: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      return { token: signToken(user), user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password)))
        throw new Error("Invalid credentials");
      return { token: signToken(user), user };
    },
    createTask: async (parent, { title, description }, context) => {
      if (context.user)
        return Task.create({ title, description, owner: context.user._id });
      throw new Error("Not authenticated");
    },
    inviteCollaborator: async (parent, { taskId, email }, context) => {
      const user = await User.findOne({ email });
      const task = await Task.findById(taskId);
      if (task.owner.toString() !== context.user._id)
        throw new Error("Not authorized");
      task.collaborators.push(user._id);
      return task.save();
    },
  },
};

module.exports = { typeDefs, resolvers };
