const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    tasks: [Task]
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    status: String
    dueDate: String
    createdAt: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    tasks: [Task]
    task(taskId: ID!): Task
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTask(title: String!, description: String, status: String, dueDate: String): Task
    updateTask(
      taskId: ID!
      title: String
      description: String
      status: String
      dueDate: String
    ): Task
    deleteTask(taskId: ID!): Task
  }
`;

module.exports = typeDefs;
