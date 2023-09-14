import { Prisma } from "@prisma/client";

export type ExtendedSession = Prisma.SessionGetPayload<{
  select: {
    userId: true;
    user: {
      select: {
        email: true;
        name: true;
        image: true;
        username: true;
      };
    };
  };
}>;

export type ExtendedPost = Prisma.PostGetPayload<{
  include: {
    user: {
      select: {
        image: true,
        username: true,
      },
    },
    likes: {
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    },
  },
}>;

export type ExtendedComment = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        username: true,
        image: true
      }
    }
  }
}>
