import { getSession } from "@/lib/get-session";
import prisma from "@/prisma/client";
import { supabase } from "@/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  const formData = await req.formData();

  const image = formData.get("image") as File | null;
  const caption = formData.get("caption") as string | null;

  if (!image || !caption) {
    return NextResponse.json(
      { error: "Invalid request form data" },
      { status: 400 }
    );
  }

  const imageName = uuidv4();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("posts")
    .upload(imageName, image);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const imageUrl = supabase.storage.from("posts").getPublicUrl(uploadData.path)
    .data.publicUrl;

  const newPost = await prisma.post.create({
    data: {
      image: imageUrl,
      caption,
      userId: session.userId,
    },
  });

  return NextResponse.json(newPost);
}
