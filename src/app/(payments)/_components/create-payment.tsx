"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  amount: z.coerce.number(),
  status: z.string(),
});

export function CreatePaymentPopover() {
  const router = useRouter();
  const createPayment = api.payment.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      amount: 0,
      status: "pending",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createPayment.mutate({ ...data });
  }
  const isLoading = form.formState.isSubmitting;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Criar pagamento</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Novo pagamento</h4>
                  <p className="text-sm text-muted-foreground">
                    Inserir informacoes do pagamento
                  </p>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-3 items-center gap-4">
                        <FormLabel asChild>
                          <Label htmlFor="status">Email</Label>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            className="col-span-2 h-8"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-3 items-center gap-4">
                        <FormLabel asChild>
                          <Label htmlFor="amount">Valor</Label>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="amount"
                            className="col-span-2 h-8"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel asChild>
                            <Label htmlFor="status">Status</Label>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="col-span-2 h-8">
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pending">Pendente</SelectItem>
                              <SelectItem value="confirmed">
                                Confirmado
                              </SelectItem>
                              <SelectItem value="canceled">
                                Cancelado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Button type="submit">
                      {isLoading ? "Salvando..." : "Salvar"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
