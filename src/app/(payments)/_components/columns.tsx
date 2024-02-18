"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./ActionColumn";
import { Badge } from "~/components/ui/badge";

export type Pagamento = {
  id: string;
  valor: string;
  status: "pending" | "confirmed" | "canceled";
  email: string;
  amount: number;
};
export const columns: ColumnDef<Pagamento>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "valor",
    header: "Valor",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const payment = row.original;

      return <Badge>{payment.status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return <ActionColumn {...payment} />;
    },
  },
];
