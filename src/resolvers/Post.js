function postedBy(parent, args, context, info) {
  return context.prisma.post.findOne({ where: { id: parent.id } }).postedBy();
}
function votes(parent, args, context, info) {
  return context.prisma.post.findOne({ where: { id: parent.id } }).votes();
}

module.exports = {
  postedBy,
  votes,
};
