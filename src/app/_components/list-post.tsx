"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { deletePost } from "~/lib/actions";

export function LisPost({ post }: { post: any }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Link className="text-3xl font-bold" href={String(post.id)}>
          {post.name}
        </Link>
        <Button
          className="h-2 w-2"
          variant="destructive"
          onClick={() => deletePost(post.id)}
        >
          X
        </Button>
      </div>
    </div>
  );
}
