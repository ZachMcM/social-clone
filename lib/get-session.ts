import { ExtendedSession } from "@/types/prisma";
import { cookies } from "next/headers";

export async function getSession(): Promise<null | ExtendedSession> {
  const sessionToken = cookies().get("sessionToken")?.value;

  if (!sessionToken) {
    return null;
  }

  const res = await fetch(`${process.env.URL}/api/auth/session`, {
    headers: {
      Cookie: `sessionToken=${sessionToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as ExtendedSession;

  return data;
}
