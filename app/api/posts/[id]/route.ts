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
      comments: {
        include: {
          user: {
            select: {
              username: true,
              image: true
            }
          }
        }
      },
    },
  });

  return NextResponse.json(post);
}
