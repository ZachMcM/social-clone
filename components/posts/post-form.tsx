"use client";

import { useMutation, useQueryClient } from "react-query";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { ImageDropzone } from "./image-dropzone";

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

  const { mutate: uploadPost, isLoading: isUploading } = useMutation({
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
      // TODO
      queryClient.invalidateQueries({ queryKey: [] });
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
    uploadPost(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
      </form>
    </Form>
  );
}
