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
      {
        cache: true,
        status: "Successful",
        lastChangeIndex: await getlastChangeIndexFromCache(),
        data: JSON.parse(hasCache),
      },
      { status: 200 }
    );
  }
  const allPost = await prisma.post.findMany({
    orderBy: { rid: "desc" },
    where: { status: "Active" },
  });
  let roman: any[] = [];
  let hindi: any[] = [];
  let urdu: any[] = [];
  allPost.forEach(({ romanTitle, hindiTitle, urduTitle, ...rest }) => {
    roman.push({
      ...rest,
      title: romanTitle,
    });
    hindi.push({
      ...rest,
      title: hindiTitle,
    });
    urdu.push({
      ...rest,
      title: urduTitle,
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
        lastChangeIndex: await getlastChangeIndexFromCache(),
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

const getlastChangeIndexFromCache = async () => {
  const hasCache = cache.get("appConfig");
  if (hasCache) {
    const ss = JSON.parse(hasCache);
    if (ss != null) {
      return ss["lastChangeIndex"];
    }
  }
  const data = await prisma.app.findUnique({ where: { vid: 1 } });
  if (data) {
    cache.put("appConfig", JSON.stringify(data));
    return data["lastChangeIndex"];
  }
  return 0;
};

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};
