import prisma from "@/prisma/db";
import { unlinkSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
var cache = require("memory-cache");

export async function GET(request: Request) {
  const search = new URL(request.url!).search;
  const urlParams = new URLSearchParams(search);
  const postId: string = urlParams.get("postId") as string;
  const language: string = urlParams.get("language") as string;
  const key = `${[postId]}_${language}`;
  const hasCache = cache.get(key);
  if (hasCache) {
    return NextResponse.json(
      { cache: true, status: "Successful", data: JSON.parse(hasCache) },
      { status: 200 }
    );
  }

  const post = await prisma.content.findMany({
    where: {
      postId: +postId,
      language:
        language == "ro" ? "Roman" : language == "hi" ? "Hindi" : "Urdu",
    },
  });
  if (!post) {
    return NextResponse.json(
      { status: "Error", data: "Error no post found!" },
      {
        status: 203,
      }
    );
  }
  console.log({ post });
  cache.put(key, JSON.stringify(post));
  return NextResponse.json(
    { cache: false, status: "Successful", data: post },
    {
      status: 200,
    }
  );
}
