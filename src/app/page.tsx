import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { api } from "~/trpc/server";
import { CreatePost } from "./_components/create-post";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { LisPost } from "./_components/list-post";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const posts = await api.post.getAll.query();

  return (
    <div className="w-full max-w-xs">
      {posts ? (
        posts.map((post) => <LisPost post={post} />)
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
