import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Invalid request, no session found" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId
    }
  })

  return NextResponse.json(user)
}