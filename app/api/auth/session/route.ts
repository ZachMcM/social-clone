import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken");

  if (!sessionToken) {
    console.log("No token");
    return NextResponse.json(
      { error: "Error, no session found" },
      { status: 401 },
    );
  }

  const session = await prisma.session.findUnique({
    where: {
      sessionToken: sessionToken.value,
    },
    select: {
      userId: true,
      user: {
        select: {
          email: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  });

  if (!session) {
    return NextResponse.json(
      { error: "Error, no sesson found" },
      { status: 401 },
    );
  }

  return NextResponse.json(session);
}
