import { ExtendedComment } from "@/types/extensions";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "../ui/use-toast";
import { Check, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useRef } from "react";
import { useTextareaAutosize } from "@/lib/hooks/use-textarea-autosize";

const formSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comment can't be less than one character" })
    .max(2_200, { message: "Comment can't be longer than 2,200 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export function CommentForm({ postId }: { postId: string }) {
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: postComment, isLoading: postingComment } = useMutation({
    mutationFn: async (values: FormValues): Promise<ExtendedComment> => {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(
          "There was an error posting your comment. Please try again"
        );
      }

      const data = await res.json();
      return data;
    },
    onError: (err: Error) => {
      console.log(err);
      toast({
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["post", { id: postId }] });
      toast({
        description: (
          <p className="flex items-center">
            Successfully posted your comment. <Check className="h-4 w-4 ml-2" />
          </p>
        ),
      });
    },
  });

  function onSubmit(values: FormValues) {
    form.setValue("content", "")
    postComment(values);
  }

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useTextareaAutosize(textAreaRef.current, form.watch("content"))

  return (
    <div className="absolute bottom-0 w-full left-0 border-t p-2.5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2.5">
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} ref={textAreaRef} className="min-h-[85px]" placeholder="Add a comment..."/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button className="place-self-end" type="submit">Post {postingComment && <Loader2 className="h-4 w-4 ml-2 animate-spin"/>}</Button>
        </form>
      </Form>
    </div>
  );
}
