import { ExtendedSession } from "@/types/prisma";

export async function getSession() {
  const res = await fetch(`${process.env.URL}/api/auth/session`, { cache: "no-store" });
  
  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as null | ExtendedSession;

  return data;
}