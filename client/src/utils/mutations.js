import { gql } from "@apollo/client";

// Mutation: Add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation: Login an existing user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation: Add a new task
export const ADD_TASK = gql`
  mutation addTask(
    $title: String!
    $description: String
    $status: String
    $dueDate: String
  ) {
    addTask(
      title: $title
      description: $description
      status: $status
      dueDate: $dueDate
    ) {
      _id
      title
      description
      status
      dueDate
      createdAt
    }
  }
`;

// Mutation: Update an existing task
export const UPDATE_TASK = gql`
  mutation updateTask(
    $taskId: ID!
    $title: String
    $description: String
    $status: String
    $dueDate: String
  ) {
    updateTask(
      taskId: $taskId
      title: $title
      description: $description
      status: $status
      dueDate: $dueDate
    ) {
      _id
      title
      description
      status
      dueDate
    }
  }
`;

// Mutation: Delete a task
export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
      title
    }
  }
`;
