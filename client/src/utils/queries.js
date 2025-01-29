import { gql } from "@apollo/client";

// Fetch all tasks for the logged-in user
export const GET_TASKS = gql`
  query getTasks {
    tasks {
      _id
      title
      description
      status
      dueDate
    }
  }
`;

// Fetch details about the logged-in user
export const GET_USER = gql`
  query getUser {
    user {
      _id
      username
      email
      tasks {
        _id
        title
        description
        status
        dueDate
      }
    }
  }
`;
