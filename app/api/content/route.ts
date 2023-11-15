import prisma from "@/prisma/db";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  const search = new URL(request.url!).search;
  const urlParams = new URLSearchParams(search);
  const postId: string = urlParams.get("postId") as string;
  const romanPath = join(process.cwd(), `/public/roman/${postId}.json`);
  const hindiPath = join(process.cwd(), `/public/hindi/${postId}.json`);
  const urduPath = join(process.cwd(), `/public/urdu/${postId}.json`);
  const isExist = await existsSync(romanPath);
  if (isExist) {
    await unlinkSync(romanPath);
    await unlinkSync(hindiPath);
    await unlinkSync(urduPath);
  }
  console.log(isExist);
  const post = await prisma.content.findMany({ where: { postId: +postId } });
  if (!post) {
    return new Response("Error no post found!", {
      status: 200,
    });
  }
  post.forEach(async ({ language, ...rest }) => {
    if (language == "Roman") {
      await writeFileSync(romanPath, JSON.stringify(rest), "utf-8");
    } else if (language == "Hindi") {
      await writeFileSync(hindiPath, JSON.stringify(rest), "utf-8");
    } else if (language == "Urdu") {
      await writeFileSync(urduPath, JSON.stringify(rest), "utf-8");
    }
  });
  return new Response("Success!", {
    status: 200,
  });
}
