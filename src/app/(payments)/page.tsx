import { unstable_noStore as noStore } from "next/cache";
import { DataTable } from "./_components/data-table";
import { Pagamento, columns } from "./_components/columns";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatCurrencyBRL } from "~/lib/utils";
import { CreatePaymentPopover } from "./_components/create-payment";
import { api } from "~/trpc/server";
type Payment = {
  id: string;
  email: string;
  status: string;
  amount: number;
};

export default async function Home() {
  noStore();
  const payments = await getData();
  const formattedPayments: Pagamento[] = payments.map((payment) => {
    return {
      id: payment.id,
      email: payment.email,
      status: payment.status,
      valor: formatCurrencyBRL(payment.amount),
      amount: payment.amount,
    };
  });

  return (
    <main className="min-h-screen p-8">
      <div>
        <div className="mb-2 flex flex-1 items-center justify-between">
          <Input
            className="w-1/6"
            placeholder="Buscar por email..."
            type="text"
          />
          <CreatePaymentPopover />
        </div>
        <DataTable data={formattedPayments} columns={columns} />
      </div>
    </main>
  );
}
async function getData(): Promise<Payment[]> {
  const payments = await api.payment.getWithPagination.query();
  return payments;
}
