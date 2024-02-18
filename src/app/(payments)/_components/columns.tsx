"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { ActionColumn } from "./action-column";
import clsx from "clsx";

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
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Badge
          className={clsx({
            "bg-green-500": payment.status === "confirmed",
            "bg-red-500": payment.status === "canceled",
          })}
        >
          {payment.status}
        </Badge>
      );
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
