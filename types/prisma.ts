import { Prisma } from "@prisma/client";

export type ExtendedSession = Prisma.SessionGetPayload<{
  select: {
    userId: true,
    user: {
      select: {
        email: true,
        name: true,
        image: true
      }
    }
  }
}>