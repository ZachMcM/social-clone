import { SignUpForm } from "@/components/auth/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignUp() {
  return (
    <Card className="min-w-[450px]">
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
        <p className="text-xs text-muted-foreground text-center">
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy.
        </p>
      </CardFooter>
    </Card>
  );
}
