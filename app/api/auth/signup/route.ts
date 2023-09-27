import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { createSession } from "@/lib/create-session";

export async function POST(req: NextRequest) {
  const { name, username, email, password } = (await req.json()) as {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password || !username) {
    return NextResponse.json(
      { error: "Invalid request, invalid payload" },
      { status: 400 },
    );
  }

  const sameEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (sameEmail) {
    return NextResponse.json(
      { error: "Error, a user with this email already exists." },
      { status: 400 },
    );
  }

  const sameUsername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (sameUsername) {
    return NextResponse.json(
      { error: "Error, a user with this username already exists." },
      { status: 400 },
    );
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: encryptedPassword,
    },
  });

  const newSession = await createSession(newUser);
  return newSession;
}
