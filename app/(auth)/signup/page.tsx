import { SignUpForm } from "@/components/auth/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email to sign up for an account{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter>
        <div className="flex flex-col space-y-1">
          <p className="text-xs text-muted-foreground text-center">
            By signing up, you agree to our Terms, Privacy Policy, and Cookies
            Policy.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Already have an account?{" "}
            <Link className="underline" href="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
