import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const GET_USER_BY_TOKEN = gql`
  query GetUserByTokenQuery {
    getUserByToken {
      id
      email
      firstName
      lastName
      phoneNumber
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $email: String!
    $firstName: String!
    $password: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      password: $password
    ) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUserByEmail($email: String!) {
    deleteUserByEmail(email: $email) {
      email
    }
  }
`;
