function post(parent, args, context, info) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).post();
}

function user(parent, args, context, info) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}

module.exports = {
  post,
  user,
};
