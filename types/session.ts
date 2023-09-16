import { ExtendedSession } from "./prisma";

export type SessionProviderValues = {
  session: ExtendedSession | null | undefined;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signOut: () => void;
  signUp: ({ name, username, email, password }: { name: string, username: string, email: string; password: string }) => void;
  signingIn: boolean,
  signingUp: boolean,
  signingOut: boolean,
  sessionLoading: boolean
} 