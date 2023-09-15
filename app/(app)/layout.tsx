import { NavHeader } from "@/components/nav/nav-header";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <NavHeader />
      <div className="flex-1 px-4 py-6 max-w-4xl xl:max-w-6xl mx-auto w-full">
        {children}
      </div>
    </div>
  )
}