import { Button } from "~/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Pagamento } from "./columns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "confirmed", "canceled"]),
});
export function EditPayment(payment: Pagamento) {
  const router = useRouter();
  const updatePayment = api.payment.update.useMutation({
    onSuccess: () => {
      router.refresh();
      location.reload();
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: payment.id,
      email: payment.email,
      amount: payment.amount,
      status: payment.status,
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    updatePayment.mutate({
      id: data.id,
      email: data.email,
      amount: Number(data.amount),

      status: data.status,
    });
  }
  const isLoading = form.formState.isSubmitting;
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar pagamento</DialogTitle>
        <DialogDescription>
          Faca alteracaoes no pagamento aqui. Clique em salvar quando estiver
          pronto.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel asChild>
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-2"
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
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel asChild>
                    <Label htmlFor="amount" className="text-right">
                      Valor
                    </Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="amount"
                      placeholder={payment.valor}
                      className="col-span-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel asChild>
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="canceled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
