import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const search = new URL(request.url!).search;
  const urlParams = new URLSearchParams(search);
  const path: string = urlParams.get("path") as string;
  try {
    revalidatePath(path);
  } catch (error: any) {
    return new Response(`Revalidate error: ${error.toString()}`, {
      status: 400,
    });
  }
  return new Response("Success!", {
    status: 200,
  });
}
