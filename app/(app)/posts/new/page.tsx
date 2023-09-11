import { PostForm } from "@/components/posts/post-form";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function NewPost() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col space-y-8">
    <div className="flex flex-col space-y-1">
      <h3 className="text-3xl font-bold">New Post</h3>
      <p className="text-muted-foreground font-medium">Upload an image and add a caption to create a new post.</p>
    </div>
    <Separator/>
    <PostForm/>
  </div>
  )
}