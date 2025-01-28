import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

export const QUERY_TASKS = gql`
  query Tasks {
    tasks {
      _id
      title
      description
      status
      owner {
        email
      }
      collaborators {
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String) {
    createTask(title: $title, description: $description) {
      _id
      title
      description
      status
    }
  }
`;

export const INVITE_COLLABORATOR = gql`
  mutation InviteCollaborator($taskId: ID!, $email: String!) {
    inviteCollaborator(taskId: $taskId, email: $email) {
      _id
      title
      collaborators {
        email
      }
    }
  }
`;
