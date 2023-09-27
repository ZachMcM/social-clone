import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 },
    );
  }

  const { username }: { username: string } = await req.json();

  if (!username) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (username == session.user.username) {
    return NextResponse.json(
      { error: "Invalid request, you can't follow yourself" },
      { status: 400 },
    );
  }

  const existingFollow = await prisma.user.findFirst({
    where: {
      username,
      followers: { some: { id: session.userId } },
    },
  });

  if (!existingFollow) {
    const newFollower = await prisma.user.update({
      where: {
        username,
      },
      data: {
        followers: { connect: { id: session.userId } },
      },
    });

    return NextResponse.json(newFollower);
  } else {
    const removedFollower = await prisma.user.update({
      where: {
        username,
      },
      data: {
        followers: { disconnect: { id: session.userId } },
      },
    });

    return NextResponse.json(removedFollower);
  }
}
