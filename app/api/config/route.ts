import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
var cache = require("memory-cache");

export async function GET(request: Request) {
  const hasCache = cache.get("appConfig");
  console.log({ hasCache });
  if (hasCache) {
    return NextResponse.json(
      { cache: true, status: "Successful", data: JSON.parse(hasCache) },
      { status: 200 }
    );
  }
  const data = await prisma.app.findUnique({ where: { vid: 1 } });
  cache.put("appConfig", JSON.stringify(data));
  return NextResponse.json(
    { cache: false, status: "Successful", data: data },
    { status: 200 }
  );
}
