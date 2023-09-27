import { createSession } from "@/lib/create-session";
import prisma from "@/prisma/client";
import bycrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { error: "Invalid request, invalid payload" },
      { status: 400 },
    );
  }

  const whereClause = email.includes("@")
    ? { email: email }
    : { username: email };

  const user = await prisma.user.findUnique({
    where: whereClause,
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid request, no user found" },
      { status: 404 },
    );
  }

  const isPasswordCorrect = await bycrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json(
      { error: "Invalid request, incorrect password" },
      { status: 401 },
    );
  }

  const newSession = await createSession(user);
  return newSession;
}
