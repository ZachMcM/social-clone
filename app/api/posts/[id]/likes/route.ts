import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 },
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  let likeExists = false;

  for (const like of post.likes) {
    if (like.userId == session.userId) {
      likeExists = true;
    }
  }

  if (likeExists) {
    const removedLike = await prisma.like.delete({
      where: {
        userId_postId: { userId: session.userId, postId: post.id },
      },
    });

    return NextResponse.json(removedLike);
  } else {
    const newLike = await prisma.like.create({
      data: {
        userId: session.userId,
        postId: post.id,
      },
    });

    return NextResponse.json(newLike);
  }
}
