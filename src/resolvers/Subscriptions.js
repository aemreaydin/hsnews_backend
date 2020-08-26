function newPostSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_POST");
}
const newPost = {
  subscribe: newPostSubscribe,
  resolve: (payload) => payload,
};

function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}
const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newPost,
  newVote,
};
