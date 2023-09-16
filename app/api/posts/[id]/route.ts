import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
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
  });

  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
  const id = params.id

  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 })
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id,
      userId: session.userId
    }
  })

  return NextResponse.json(deletedPost)
}