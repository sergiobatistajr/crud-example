"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const schema = z.object({
  id: z.number(),
  name: z.string().min(3, {
    message: "Titulo e obrigatorio",
  }),
});

export function UpdatePost({ post }: { post: any }) {
  const router = useRouter();

  const updatePost = api.post.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: post.id,
      name: post.name,
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    updatePost.mutate({
      id: Number(values.id),
      name: values.name,
    });
    router.push("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Novo titulo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Seu novo titulo deve ser curto e objetivo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {updatePost.isLoading ? "Atualizando" : "Atualizar"}
        </Button>
      </form>
    </Form>
  );
}
