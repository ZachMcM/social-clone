import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { supabase } from "@/supabase/client";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Invalid request, no session found" }, { status: 400 })
  }

  const formData = await req.formData()
  const name = formData.get("name") as string | null
  const username = formData.get("username") as string | null
  const email = formData.get("email") as string | null
  const bio = formData.get("bio") as string | null
  const pfp = formData.get("pfp") as File | null

  if (!name || !username || !email || !bio) {
    return NextResponse.json({ error: "Invalid request body"}, { status: 400 })
  }

  let image = ""

  if (pfp) {
    const { data: uploadData, error: uploadError } = await supabase.storage.from("pfps").upload(pfp.name, pfp)
    if (!uploadData) {
      console.log(uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 400 })
    }
    image = supabase.storage.from("pfps").getPublicUrl(uploadData.path).data.publicUrl
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: session.userId
    },
    data: {
      name,
      username,
      email,
      bio,
      image
    }
  })

  return NextResponse.json(updatedUser)
}