import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { getSession } from "@/lib/get-session";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = await getSession();

  const cursorParam = searchParams.get("cursor")

  if (!cursorParam) {
    return NextResponse.json(
      { error: "Invalid request query" },
      { status: 400 }
    );
  }

  const cursor = parseInt(cursorParam)

  if (session) {
    const followers = prisma.user.findMany({
      where: {
        follows: {
          some: {
            id: session.userId,
          },
        },
      },
    });

    const followerIds = (await followers).map((follower: User) => {
      return follower.id;
    });

    const customPosts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          likes: {
            _count: "desc",
          },
        },
      ],
      where: {
        userId: {
          in: followerIds,
        },
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
                username: true,
              },
            },
          },
        },
      },
      take: 3,
      skip:cursor == 0 ? cursor : (cursor - 1) * 3,
    });

    if (customPosts.length < 3) {
      const posts = await prisma.post.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            likes: {
              _count: "desc",
            },
          },
        ],
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
                  username: true,
                },
              },
            },
          },
        },
        take: 3,
        skip:cursor == 0 ? cursor : (cursor - 1) * 3,
      });
      return NextResponse.json(posts);
    } else {
      return NextResponse.json(customPosts);
    }
  } else {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          likes: {
            _count: "desc",
          },
        },
      ],
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
                username: true,
              },
            },
          },
        },
      },
      take: 3,
      skip:cursor == 0 ? cursor : (cursor - 1) * 3,
    });
    return NextResponse.json(posts);
  }
}
