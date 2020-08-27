const { ApolloServer, PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscriptions");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Vote,
};
const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const pubsub = new PubSub();
const prisma = new PrismaClient();
const server = new ApolloServer({
  cors: false,
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      request: req,
      prisma,
      pubsub,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
