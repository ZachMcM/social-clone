import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken");

  if (!sessionToken) {
    return NextResponse.json({ error: "No sesson found" }, { status: 401 });
  }

  const deletedSession = await prisma.session.delete({
    where: {
      sessionToken: sessionToken.value,
    },
  });

  req.cookies.delete("sessionToken");

  return NextResponse.json(deletedSession);
}
