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
  name: z.string().min(3, {
    message: "Titulo e obrigatorio",
  }),
});

export function CreatePost() {
  const router = useRouter();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof schema>) {
    createPost.mutate({
      name: values.name,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Titulo" {...field} />
              </FormControl>
              <FormDescription>
                Seu titulo deve ser curto e objetivo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createPost.isLoading}>
          {createPost.isLoading ? "Criando..." : "Criar"}
        </Button>
      </form>
    </Form>
  );
}