"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./action-column";

export type Pagamento = {
  id: string;
  valor: string;
  status: string;
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return <ActionColumn {...payment} />;
    },
  },
];
