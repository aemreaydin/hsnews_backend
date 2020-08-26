function posts(parent, args, context, info) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).posts();
}

module.exports = {
  posts,
};
