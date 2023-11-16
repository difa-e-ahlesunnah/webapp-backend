import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
var cache = require("memory-cache");

export async function GET(request: Request) {
  const search = new URL(request.url!).search;
  const urlParams = new URLSearchParams(search);
  const language: string = urlParams.get("language") as string;
  const hasCache = cache.get(language);
  if (hasCache) {
    return NextResponse.json(
      { cache: true, status: "Successful", data: JSON.parse(hasCache) },
      { status: 200 }
    );
  }
  const allPost = await prisma.post.findMany({ orderBy: { rid: "desc" } });
  let roman: any[] = [];
  let hindi: any[] = [];
  let urdu: any[] = [];
  allPost.forEach((f) => {
    roman.push({
      thumbnail: f["thumbnail"],
      created_at: f["created_at"],
      rid: f["rid"],
      id: f["id"],
      title: f["romanTitle"],
    });
    hindi.push({
      thumbnail: f["thumbnail"],
      created_at: f["created_at"],
      rid: f["rid"],
      id: f["id"],
      title: f["hindiTitle"],
    });
    urdu.push({
      thumbnail: f["thumbnail"],
      created_at: f["created_at"],
      rid: f["rid"],
      id: f["id"],
      title: f["urduTitle"],
    });
  });
  try {
    cache.put("roman", JSON.stringify(roman));
    cache.put("hindi", JSON.stringify(hindi));
    cache.put("urdu", JSON.stringify(urdu));
    return NextResponse.json(
      {
        cache: false,
        status: "Successful",
        data: language == "roman" ? roman : language == "hindi" ? hindi : urdu,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(error, {
      status: 200,
    });
  }
}
