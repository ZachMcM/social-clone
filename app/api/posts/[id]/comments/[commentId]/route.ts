import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string, commentId: string }}) {
  const postId = params.id
  const commentId = params.commentId

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })
  }

  const deletedComment = await prisma.comment.delete({
    where: {
      id: commentId,
      postId: postId,
      userId: session.userId
    }
  })

  return NextResponse.json(deletedComment)
}