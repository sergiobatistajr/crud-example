"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "~/lib/actions";
export function LisPost({
  post,
}: {
  post: {
    id: number;
    name: string;
  };
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <Link className="text-3xl font-bold" href={String(post.id)}>
          {post.name}
        </Link>
        <form action={deletePost}>
          <input className="sr-only" name="id" defaultValue={post.id} />
          <Button type="submit" variant="ghost" size="sm">
            <Trash2 />
          </Button>
        </form>
      </div>
    </div>
  );
}
