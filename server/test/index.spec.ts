/* eslint-disable no-undef */
import { ApolloServer, gql } from 'apollo-server'
import { typeDefs, resolvers } from '../src/graphql/schema'
import { testUser } from './config'

it('returns list of users', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const result = await testServer.executeOperation({
        query: 'query FetchUsers { users { id, firstName, lastName, email, phoneNumber, password } }',
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.users).toBeTruthy()
    expect(result.data?.users.length).toBeGreaterThan(0)
})

it('should create new user', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const result = await testServer.executeOperation({
        query: `
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
    `,
        variables: {
            email: testUser.email,
            firstName: testUser.firstName,
            password: testUser.password,
            lastName: testUser.lastName,
            phoneNumber: testUser.phoneNumber,
        },
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.createUser?.token).toBeTruthy()
})
it('should return token', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const result = await testServer.executeOperation({
        query: `mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }`,
        variables: {
            email: testUser.email,
            password: testUser.password,
        },
    })
    expect(result.errors).toBeUndefined()
    expect(result.data?.login?.token).toBeTruthy()
})

it('should delete created user', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const result = await testServer.executeOperation({
        query: `
    mutation DeleteUserByEmail($email: String!) {
      deleteUserByEmail(email: $email) {
        email
      }
    }
  `,
        variables: {
            email: testUser.email,
        },
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.deleteUserByEmail?.email).toBeTruthy()
})
