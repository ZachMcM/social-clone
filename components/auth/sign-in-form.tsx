"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSession } from "../providers/session-provider";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string({
    required_error: "Email or Username is required.",
  }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
  const { signIn, signingIn } = useSession()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    signIn(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign In { signingIn && <Loader2 className="h-4 w-4 animate-spin"/>}
        </Button>
      </form>
    </Form>
  );
}
