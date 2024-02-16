"use server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function createPostts(prsStat: any, formData: FormData) {
  // const createPost = api.post.create.useMutation({
  // onSuccess: () => { },
  // });
}
export async function deletePost(id: number) {
  await api.post.delete.mutate({ id });
  revalidatePath("/");
}
