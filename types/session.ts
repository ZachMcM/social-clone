import { ExtendedSession } from "./prisma";

export type SessionProviderValues = {
  session: ExtendedSession | null | undefined;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  signOut: () => void;
  signUp: ({ name, email, password }: { name: string, email: string; password: string }) => void;
  signingIn: boolean,
  signingUp: boolean,
  signingOut: boolean,
  sessionLoading: boolean
} 