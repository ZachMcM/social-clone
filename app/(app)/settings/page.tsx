import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Settings() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <></>
  )

  
}