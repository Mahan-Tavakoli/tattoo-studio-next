"use client";

import Image from "next/image";
import useArticle from "./useArticle";
import BlurImage from "@/components/templates/skeleton/BlurImage";

function ArticleDetails() {
  const { singleArticleData, singleArticleIsLoading, singleArticleIsError } =
    useArticle();

  console.log("singleArticleBySlug =>", singleArticleData);
  if (!singleArticleData) return null;
  if (singleArticleIsLoading) return <div>Loading ...</div>;
  if (singleArticleIsError) return <div>Error</div>;
  return (
    <section className="py-16 px-[5%]">
      <div className="container mx-auto py-15">
        <div className="w-full mx-auto flex items-center justify-center flex-col">
          <div className="border border-snow/5 rounded-xl shadow shadow-snow">
            <div className="my-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                {singleArticleData.title}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center px-6 pb-6">
              {/* LEFT: Artist Image and Styles */}
              <div className="relative w-200 h-60 overflow-hidden rounded-2xl bg-onyx mb-6">
                <BlurImage
                  src={singleArticleData.coverUrl}
                  alt={singleArticleData.title}
                  fill
                  preload
                  blurDataURL="/images/placeholder.png"
                  className="object-cover grayscale"
                />
              </div>

              {/* Styles under the image */}
              <div className="flex flex-wrap w-200">
                <p>{singleArticleData.content}</p>
              </div>
            </div>

            {/* RIGHT: Bio & Info Cards */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticleDetails;
