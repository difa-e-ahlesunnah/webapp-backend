import { LanguageConstant } from "@/app/constants";
import prisma from "@/prisma/db";
import { LanguageType } from "@prisma/client";

type SinglePostContentProps = {
  params: {
    id: string;
    language: string;
  };
};
export const revalidate = process.env["NEXT_PUBLIC_Revalidate"] || 0;

export async function generateStaticParams() {
  const getAllPosts = await prisma.post.findMany({ select: { id: true } });
  let data: any[] = [];
  getAllPosts.forEach((f) => {
    LanguageConstant.forEach((l) => {
      data.push({ ...l, id: f["id"].toString() });
    });
  });
  return data;
}

export default async function UsersAllPost({
  params: { language, id },
}: SinglePostContentProps) {
  const singleContent = await prisma.content.findFirst({
    where: {
      postId: +id,
      language:
        language == "Roman"
          ? LanguageType.Roman
          : language == "Hindi"
          ? LanguageType.Hindi
          : LanguageType.Urdu,
    },
  });
  return (
    <main>
      <div id="root-div">{JSON.stringify(singleContent)}</div>
    </main>
  );
}
