import { unstable_noStore as noStore } from "next/cache";
import { CreatePaymentPopover } from "./_components/create-payment";
import Search from "~/components/Search";
import { Suspense } from "react";
import TablePayment from "./_components/table-payment";
import { SkeletonPayment } from "./_components/skeleton-payment";
import Pagination from "./_components/pagination";
import { api } from "~/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  noStore();
  // eslint-disable-next-line
  const query = searchParams?.query || "";
  // eslint-disable-next-line
  const currentPage = Number(searchParams?.page) || 1;
  console.log("currentPage", currentPage);
  const totalPages = await getPagination(query);
  return (
    <main className="min-h-screen p-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 justify-between">
          <Search placeholder="Buscar por email e status..." />
          <CreatePaymentPopover />
        </div>
        <Suspense key={query + currentPage} fallback={<SkeletonPayment />}>
          <TablePayment query={query} currentPage={currentPage} />
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
async function getPagination(query: string) {
  const totalPages = await api.payment.getPages.query({ query });
  return totalPages;
}
