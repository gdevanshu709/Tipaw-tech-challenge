import { merge } from 'lodash'
import { gql } from 'apollo-server'
import { userTypeDef, userResolvers } from './user'

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  `

const typeDefs = gql(`${Query}${userTypeDef}`)

const resolvers = merge({}, userResolvers)

export { typeDefs, resolvers }
