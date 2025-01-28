import { gql } from "@apollo/client";

// Query: Get all tasks
export const GET_TASKS = gql`
  query getTasks {
    tasks {
      _id
      title
      description
      status
      dueDate
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

// Query: Get a specific task by ID
export const GET_TASK = gql`
  query getTask($taskId: ID!) {
    task(taskId: $taskId) {
      _id
      title
      description
      status
      dueDate
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

// Query: Get all users
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      tasks {
        _id
        title
        status
      }
    }
  }
`;

// Query: Get a specific user by username
export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      tasks {
        _id
        title
        status
      }
    }
  }
`;
