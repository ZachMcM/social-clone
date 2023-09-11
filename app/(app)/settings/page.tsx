import DangerZone from "@/components/settings/danger-zone";
import { UserForm } from "@/components/settings/user-form";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Settings() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-1">
        <h3 className="text-3xl font-bold">Settings</h3>
        <p className="text-muted-foreground font-medium">Manage your profile and user settings.</p>
      </div>
      <Separator/>
      <UserForm/>
      <Separator/>
      <DangerZone/>
    </div>
  )
}