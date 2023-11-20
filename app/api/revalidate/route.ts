import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
var cache = require("memory-cache");

export async function GET(request: Request) {
  const search = new URL(request.url!).search;
  const urlParams = new URLSearchParams(search);
  const key: string = urlParams.get("key") as string;
  // if (key == "appConfig") {
  //   await revalidatePath("/api/appConfig");
  //   await revalidatePath("api/appConfig");
  // }
  return NextResponse.json(
    {
      deleted: key == "all" ? await cache.clear() : await cache.del(key),
      all: await cache.keys(),
    },
    {
      status: 200,
    }
  );
}
