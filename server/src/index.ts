import { ApolloServer } from 'apollo-server';
import { getUserByToken } from './controllers/user.controller';

import { typeDefs, resolvers } from './graphql/schema';
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Koa, Lambda, etc.
    //
    // To find out the correct arguments for a specific integration,
    // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    // Try to retrieve a user with the token
    const user = await getUserByToken(token);

    // Add the user to the context
    return { user };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }: { url: any }) => {
  console.log(`🚀  Server ready at ${url}`);
});
