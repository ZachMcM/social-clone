import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const postId = params.id;

  const postComments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  return NextResponse.json(postComments);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const postId = params.id;
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 },
    );
  }

  const { content } = (await req.json()) as {
    content: string | null | undefined;
  };

  if (!content) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const newComment = await prisma.comment.create({
    data: {
      postId,
      userId: session.userId,
      content,
    },
  });

  return NextResponse.json(newComment);
}
