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
        image: true;
        username: true;
      };
    };
    likes: {
      include: {
        user: {
          select: {
            username: true;
          };
        };
      };
    };
  };
}>;

export type ExtendedComment = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        username: true;
        image: true;
      };
    };
  };
}>;

export type ExtendedUser = Prisma.UserGetPayload<{
  select: {
    posts: {
      select: {
        image: true;
        id: true;
      };
    };
    followers: {
      select: {
        username: true;
        image: true;
      };
    };
    follows: {
      select: {
        username: true;
        image: true;
      };
    };
    image: true;
    name: true;
    username: true;
    bio: true;
  };
}>;

export type SelectivePost = Prisma.PostGetPayload<{
  select: {
    id: true;
    image: true;
  };
}>;
