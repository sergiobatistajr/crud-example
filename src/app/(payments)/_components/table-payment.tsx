import { formatCurrencyBRL } from "~/lib/utils";
import { columns, Pagamento } from "./columns";
import { DataTable } from "./data-table";
import { api } from "~/trpc/server";

type Payment = {
  id: string;
  email: string;
  status: string;
  amount: number;
};
export default async function TablePayment({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const payments = await getData(query, currentPage);
  const formattedPayments: Pagamento[] = payments.map((payment) => {
    return {
      id: payment.id,
      email: payment.email,
      status: payment.status,
      valor: formatCurrencyBRL(payment.amount),
      amount: payment.amount,
    };
  });
  return <DataTable data={formattedPayments} columns={columns} />;
}
async function getData(query: string, currentPage: number): Promise<Payment[]> {
  const payments = api.payment.getByQueryWithPaginatin.query({
    query,
    currentPage,
  });
  return payments;
}
