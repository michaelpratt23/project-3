import { gql } from "@apollo/client";

// Add a new user (Signup)
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

// Login an existing user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Add a new task
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
    }
  }
`;

// Update an existing task
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

// Delete a task
export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      _id
      title
    }
  }
`;
