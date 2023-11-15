import prisma from "@/prisma/db";
import { writeFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  console.log("ADASDSAD");
  const data = await prisma.app.findUnique({ where: { vid: 1 } });
  console.log({ data });
  const configPath = join(process.cwd(), "/public/config.json");
  console.log({ configPath });
  await writeFileSync(configPath, JSON.stringify(data), "utf-8");
  return new Response("Success!", {
    status: 200,
  });
}
