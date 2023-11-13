import { LanguageConstant } from "@/app/constants";
import prisma from "@/prisma/db";

type UsersAllPostProps = {
  params: {
    language: string;
  };
};
export const revalidate = process.env["NEXT_PUBLIC_Revalidate"] || 0;

export async function generateStaticParams() {
  return LanguageConstant;
}

export default async function UsersAllPost({
  params: { language },
}: UsersAllPostProps) {
  const allPost = await prisma.post.findMany({
    select: {
      thumbnail: true,
      created_at: true,
      id: true,
      rid: true,
      romanTitle: language == "Roman",
      hindiTitle: language == "Hindi",
      urduTitle: language == "Urdu",
    },
    where: { status: "Active" },
  });
  return (
    <main>
      <div id="root-div">{JSON.stringify(allPost)}</div>
    </main>
  );
}
