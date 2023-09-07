"use client";

import { ExtendedSession } from "@/types/prisma";
import { ReactNode, createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { SessionProviderValues } from "@/types/session";

const SessionContext = createContext<SessionProviderValues | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  // the session variable
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      const data = (await res.json()) as null | ExtendedSession;
      
      if (!res.ok) {
        return null;
      }

      return data;
    },
    queryKey: ["session"],
  });

  // sign out function
  const { mutate: signOut, isLoading: signingOut } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/signout", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("There was an error signing out. Please try again.");
      }

      const data = await res.json();
      return data;
    },
    onError: (error: Error) => {
      console.log(error);
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/");
      toast({
        description: "Successfully signed out.",
      });
    },
  });

  // sign up function
  const { mutate: signUp, isLoading: signingUp } = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Error, a user with this email already exists.");
      }

      const data = await res.json();
      return data;
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/");
      toast({
        description: "Successfully signed up.",
      });
    },
  });

  // sign in function
  const { mutate: signIn, isLoading: signingIn } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status == 404) {
        throw new Error("Error, no user found with this email.");
      }

      if (res.status == 401) {
        throw new Error("Error, the password is incorrect.");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/");
      toast({
        description: "Successfully signed in.",
      });
    },
    onError: (error: Error) => {
      console.log(error);
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <SessionContext.Provider value={{
      session,
      signIn,
      signOut,
      signUp,
      sessionLoading,
      signingIn,
      signingOut,
      signingUp
    }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext) as SessionProviderValues
}
