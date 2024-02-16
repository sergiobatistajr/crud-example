"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { api } from "~/trpc/server";
const deletSchema = z.object({
  id: z.coerce.number().min(1),
});
// export async function createPostts(prsStat: any, formData: FormData) {
// const createPost = api.post.create.useMutation({
// onSuccess: () => { },
// });
// }
export async function deletePost(formData: FormData) {
  const validatedFields = deletSchema.parse({
    id: formData.get("id"),
  });
  await api.post.delete.mutate({ id: validatedFields.id });
  revalidatePath("/");
}
