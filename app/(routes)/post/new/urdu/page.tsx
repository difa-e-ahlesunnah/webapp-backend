import { LanguageConstant } from "@/app/constants";
import prisma from "@/prisma/db";

export const revalidate = process.env["NEXT_PUBLIC_Revalidate"] || 0;

// export async function generateStaticParams() {
//   return LanguageConstant;
// }

export default async function UsersAllPost() {
  const allPost = await ss();
  return (
    <main>
      <div id="root-div">
        {JSON.stringify(
          allPost.map((m: any) => {
            return {
              thumbnail: m["thumbnail"],
              created_at: m["created_at"],
              rid: m["rid"],
              id: m["id"],
              title: m["urduTitle"],
            };
          })
        )}
      </div>
    </main>
  );
}

const ss = async () => {
  console.log("CALLING post DB");
  return await prisma.post.findMany({
    select: {
      thumbnail: true,
      created_at: true,
      id: true,
      rid: true,
      urduTitle: true,
    },
    where: { status: "Active" },
  });
};
