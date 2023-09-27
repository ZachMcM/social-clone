import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const username = params.username;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      posts: {
        select: {
          image: true,
          id: true,
        },
      },
      followers: {
        select: {
          username: true,
          image: true,
        },
      },
      follows: {
        select: {
          username: true,
          image: true,
        },
      },
      image: true,
      name: true,
      username: true,
      bio: true,
    },
  });

  return NextResponse.json(user);
}
