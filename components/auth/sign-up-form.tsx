"use client";

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

const formSchema = z
  .object({
    name: z.string().nonempty({ message: "Name can't be empty" }),
    username: z.string().min(1, { message: "Username can't be less than 1 character." }).max(50, { message: "Username can't be more than 50 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password can't be less than 8 characters." })
      .nonempty({ message: "Password can't be empty." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password can't be less than 8 characters." })
      .nonempty({ message: "Password can't be empty." }),
  })
  .refine(({password, confirmPassword}) => confirmPassword === password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const { signUp, signingUp } = useSession()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    signUp(values as Pick<FormValues, "name" | "username" | "email" | "password">)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="johndone1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="johndoe@gmail.com" />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          { signingUp ? <Loader2 className="h-4 w-4 animate-spin"/> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
