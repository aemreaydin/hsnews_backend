const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId, APP_SECRET } = require("../utils");

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found.");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password.");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return { token, user };
}

async function createPost(parent, args, context, info) {
  const userId = getUserId(context);

  const newPost = await context.prisma.post.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish("NEW_POST", newPost);

  return newPost;
}

async function updatePost(parent, args, context, info) {
  const userId = getUserId(context);

  return await context.prisma.post.update({
    where: { id: userId },
    data: {
      url: args.url,
      description: args.description,
    },
  });
}

async function deletePost(parent, args, context, info) {
  const userId = getUserId(context);

  return await context.prisma.post.delete({
    where: { id: userId },
  });
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const vote = await context.prisma.vote.findOne({
    where: { postId_userId: { postId: +args.postId, userId: userId } },
  });

  if (!!vote) {
    throw new Error(`Already voted for post: ${args.postId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: {
        connect: { id: userId },
      },
      post: { connect: { id: +args.postId } },
    },
  });
  context.pubsub.publish("NEW_VOTE", newVote);

  return newVote;
}

module.exports = {
  signup,
  login,
  createPost,
  updatePost,
  deletePost,
  vote,
};
