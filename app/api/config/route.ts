import prisma from "@/prisma/db";
import { writeFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  const data = await prisma.app.findUnique({ where: { vid: 1 } });
  const configPath = join(process.cwd(), "/public/config.json");
  await writeFileSync(configPath, JSON.stringify(data), "utf-8");
  return new Response("Success!", {
    status: 200,
  });
}
