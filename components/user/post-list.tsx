import { SelectivePost } from "@/types/prisma";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle } from "lucide-react";

export function PostList({ posts }: { posts: SelectivePost[] }) {
  return (
    <div className="w-full h-full flex-1 ">
      {posts.length != 0 ? (
        <div className="w-full h-full grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="hover:opacity-80 duration-500"
            >
              <div className="rounded-md h-[325px] w-full aspect-square border flex justify-center relative">
                <Image src={post.image} fill alt={"post"} objectFit="contain" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Alert className="w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Heads Up!</AlertTitle>
          <AlertDescription>Theres nothing here right now...</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
