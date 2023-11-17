import { NextResponse } from "next/server";
var cache = require("memory-cache");

export async function GET(request: Request) {
  const search = new URL(request.url!).search;
  const urlParams = new URLSearchParams(search);
  const key: string = urlParams.get("key") as string;
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
