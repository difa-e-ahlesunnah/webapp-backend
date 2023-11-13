import prisma from "@/prisma/db";

export const revalidate = process.env["NEXT_PUBLIC_Revalidate"] || 0;

export default async function AppGet() {
  const data = await prisma.app.findFirst();
  return (
    <main>
      <div id="root-div">{JSON.stringify(data)}</div>
    </main>
  );
}
