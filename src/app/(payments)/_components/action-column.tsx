"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Pagamento } from "./columns";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { EditPayment } from "./edit-payment";
import { AlertDialog, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { DeletePayment } from "./delete-paymente";

export function ActionColumn(payment: Pagamento) {
  return (
    <AlertDialog>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acoes</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar id do pagamento
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>Excluir</DropdownMenuItem>
            </AlertDialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mudar status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeletePayment {...payment} />
        <EditPayment {...payment} />
      </Dialog>
    </AlertDialog>
  );
}
