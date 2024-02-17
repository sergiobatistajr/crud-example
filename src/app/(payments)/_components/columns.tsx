"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./action-column";
import { Check, Clock4, XCircle } from "lucide-react";

export type Pagamento = {
  id: string;
  valor: string;
  status: string;
  email: string;
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
