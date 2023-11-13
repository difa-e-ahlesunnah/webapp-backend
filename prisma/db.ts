import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    // log: [
    //   {
    //     emit: "stdout",
    //     level: "query",
    //   },
    // ],
  });
  //@ts-ignore
  // prisma.$on("query", (e) => {
  // //@ts-ignore
  // console.log("Query: " + e.query);
  // //@ts-ignore
  // console.log("Params: " + e.params);
  //@ts-ignore
  // console.log("Duration: " + e.duration + "ms");
  // });
  return prisma;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
