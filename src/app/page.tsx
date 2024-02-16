import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";
import { CreatePost } from "./_components/create-post";
import { LisPost } from "./_components/list-post";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
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
        posts.map((post) => <LisPost key={post.id} post={post} />)
      ) : (
        <p>You have no posts yet.</p>
      )}
      <CreatePost />
    </div>
  );
}
