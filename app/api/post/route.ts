import prisma from "@/prisma/db";
import { writeFileSync } from "fs";
import { join } from "path";

const revalidate = 0;

export async function GET(request: Request) {
  const allPost = await prisma.post.findMany();
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
  const romanPath = join(process.cwd(), "/roman.json");
  console.log({ roman: roman.length, romanPath: romanPath });
  const hindiPath = join(process.cwd(), "/hindi.json");
  const urduPath = join(process.cwd(), "/urdu.json");
  await writeFileSync(romanPath, JSON.stringify(roman), "utf-8");
  await writeFileSync(hindiPath, JSON.stringify(roman), "utf-8");
  await writeFileSync(urduPath, JSON.stringify(roman), "utf-8");

  return new Response("Success!", {
    status: 200,
  });
}
