import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Pagamento } from "./columns";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function DeletePayment(payment: Pagamento) {
  const router = useRouter();
  const deletePayment = api.payment.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  function handleDelete(id: string) {
    deletePayment.mutate({
      id,
    });
  }
  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acao nao vai poder ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete.bind(null, payment.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
