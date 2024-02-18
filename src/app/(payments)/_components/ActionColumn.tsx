"use client";
import {
  Copy,
  Delete,
  FilePenLine,
  MoreHorizontal,
  Settings2,
} from "lucide-react";
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
import { DeletePayment } from "./delete-payment";

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
            <DropdownMenuLabel className="flex gap-2">
              <span>Acoes</span>
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Copy className="h-4 w-4" />
              <span>Copiar id do pagamento</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <FilePenLine className="h-4 w-4 font-bold" />
                <span>Editar</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <Delete className="h-4 w-4 font-bold" />
                <span>Excluir</span>
              </DropdownMenuItem>
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
