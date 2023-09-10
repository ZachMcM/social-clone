"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PfpDropzone } from "./pfp-dropzone";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name can't be empty." }),
  username: z
    .string()
    .min(1, { message: "Username can't be less than 1 character." })
    .max(50, { message: "Username can't be more than 50 characters." }),
  email: z.string().email(),
  bio: z
    .string()
    .min(1, { message: "Bio can't be less than 1 character." })
    .max(160, { message: "Bio can't be more than 160 characters." }),
  pfp: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function UserForm() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryFn: async (): Promise<User> => {
      const res = await fetch("/api/user/settings");
      if (!res.ok) {
        throw new Error("There was an error loading your settings.");
      }
      const data = await res.json();
      return data;
    },
    queryKey: ["user"],
    onSuccess(data) {
      form.setValue("name", data.name);
      form.setValue("username", data.username);
      form.setValue("email", data.email);
      form.setValue("bio", data.bio!);
    },
    onError(err: Error) {
      toast({
        description: err.message,
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={() => router.refresh()}>
            Try again
          </ToastAction>
        ),
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="flex flex-col space-y-6 w-full">
      <p className="font-semibold text-xl">Profile Information</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 md:w-3/5"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea className="h-[100px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="pfp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <PfpDropzone
                    updateForm={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </div>
  );
}
