import { NavHeader } from "@/components/nav/nav-header";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex w-full">
      <NavHeader />
    </div>
  )
}