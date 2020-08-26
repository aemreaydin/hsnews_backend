async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  const posts = context.prisma.post.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = context.prisma.post.count({ where });
  return { posts, count };
}
async function post(parent, args, context, info) {
  return await context.prisma.post.findOne({ where: { id: +args.id } });
}
async function users(parent, args, context, info) {
  return await context.prisma.user.findMany();
}
async function user(parent, args, context, info) {
  return await context.prisma.user.findOne({ where: { email: args.email } });
}
module.exports = {
  feed,
  post,
  user,
  users,
};
