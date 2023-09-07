import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'
import { createSession } from "@/lib/create-session";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json() as { 
    name?: string
    email?: string,
    password?: string
  }

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Invalid request, invalid payload" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (user) {
    return NextResponse.json({ error: "Invalid request, user already exists" }, { status: 400 })
  }

  const encryptedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: encryptedPassword
    }
  })

  const newSession = await createSession(newUser)
  return newSession
}