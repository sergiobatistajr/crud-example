import { api } from "~/trpc/server";
import { UpdatePost } from "../_components/update-post";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { id: string } }) {
  const post = await api.post.getById.query({ id: Number(params.id) });
  if (!post) notFound();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <UpdatePost post={post} />
    </main>
  );
}
