"use client";

import { useMutation, useQueryClient } from "react-query";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ImageDropzone } from "./image-dropzone";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "../providers/session-provider";

const formSchema = z.object({
  image: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
  caption: z
    .string()
    .min(1, { message: "Caption can't be less than 1 character." })
    .max(2_200, { message: "Caption can't be more than 2,200 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function PostForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { session } = useSession()

  const { mutate: post, isLoading: isPosting } = useMutation({
    mutationFn: async ({ image, caption }: FormValues) => {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(
          "There was an error uploading your post. Please try again."
        );
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users', { username: session?.user.username }] });
      console.log(data);
      toast({
        description: (
          <p className="flex items-center">
            Successfully uploaded your post. <Check className="h-4 w-4 ml-2" />
          </p>
        ),
      });
      router.push(`/posts/${data.id}`);
    },
    onError: (err: Error) => {
      console.log(err);
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    post(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid lg:grid-cols-2 gap-6"
      >
        <FormField
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageDropzone updateForm={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-6">
          <FormField
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Your caption..."
                    {...field}
                    className="h-[150px]"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit place-self-end">
            Post {isPosting && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
