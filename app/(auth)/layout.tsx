import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (session) {
    redirect("/")
  }  

  return (
    <div className="h-screen flex flex-1 justify-center items-center">
      <div className="absolute top-0 left-0 m-6">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4 mr-2"/>
            <span>Back</span>
          </Button>
        </Link>
      </div>
      {children}
    </div>
  )
}