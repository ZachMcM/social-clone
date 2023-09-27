import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function createSession(user: User) {
  const response = NextResponse.json({ status: 200 });
  const expiresAt = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  );

  const newSession = await prisma.session.create({
    data: {
      sessionToken: uuidv4(),
      userId: user.id,
      expiresAt,
    },
  });

  response.cookies.set({
    name: "sessionToken",
    value: newSession.sessionToken,
    httpOnly: true,
    expires: expiresAt,
  });

  return response;
}
