import { SignInForm } from "@/components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignIn() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email or username to sign in.{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center">
          Don't have an account?{" "}
          <Link className="underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
