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
  // const allPost = await prisma.post.findMany();
  // let roman: any[] = [];
  // let hindi: any[] = [];
  // let urdu: any[] = [];
  // allPost.forEach((f) => {
  //   roman.push({
  //     thumbnail: f["thumbnail"],
  //     created_at: f["created_at"],
  //     rid: f["rid"],
  //     id: f["id"],
  //     title: f["romanTitle"],
  //   });
  //   hindi.push({
  //     thumbnail: f["thumbnail"],
  //     created_at: f["created_at"],
  //     rid: f["rid"],
  //     id: f["id"],
  //     title: f["hindiTitle"],
  //   });
  //   urdu.push({
  //     thumbnail: f["thumbnail"],
  //     created_at: f["created_at"],
  //     rid: f["rid"],
  //     id: f["id"],
  //     title: f["urduTitle"],
  //   });
  // });
  // const romanPath = join(process.cwd(), "/public/roman.json");
  // const hindiPath = join(process.cwd(), "/public/hindi.json");
  // const urduPath = join(process.cwd(), "/public/urdu.json");
  // await writeFileSync(romanPath, JSON.stringify(roman), "utf-8");
  // await writeFileSync(hindiPath, JSON.stringify(roman), "utf-8");
  // await writeFileSync(urduPath, JSON.stringify(roman), "utf-8");
}
