import { formatCurrencyBRL } from "~/lib/utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "~/trpc/server";
import { z } from "zod";

const paymentSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  amount: z.coerce.number(),
  valor: z.string(),
  status: z.enum(["pending", "confirmed", "canceled"]),
});
export default async function TablePayment({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const payments = await getData(query, currentPage);
  const formattedPayments = payments.map((payment) => {
    const rawData = {
      id: payment.id,
      email: payment.email,
      status: payment.status,
      valor: formatCurrencyBRL(payment.amount),
      amount: payment.amount,
    };

    const parsedData = paymentSchema.parse(rawData);
    return parsedData;
  });
  return <DataTable data={formattedPayments} columns={columns} />;
}
async function getData(query: string, currentPage: number) {
  const payments = api.payment.getByQueryWithPaginatin.query({
    query,
    currentPage,
  });
  return payments;
}
