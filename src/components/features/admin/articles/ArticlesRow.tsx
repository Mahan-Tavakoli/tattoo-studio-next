import { ArticleInfo } from "@/components/schema & types/article/article.types";
import Table from "@/components/ui/Table";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";

interface ArticlesRowProps {
  index: number;
  onEdit: () => void;
  article: ArticleInfo;
}

function ArticlesRow({ article, index, onEdit }: ArticlesRowProps) {
  //   const { editArtistStatus, editArtistStatusIsPending } = useArticle();

  //   const handleActiveToggle = () => {
  //     editArtistStatus({
  //       artistId: artist?.id,
  //       status: artist.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
  //     });
  //   };

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{article.author?.displayName || "Admin"}</td>
      <td>{article.title}</td>
      <td>
        <div className="flex items-center justify-center gap-3">
          {/* Status Text */}
          <span
            className={`text-xs font-medium tracking-wide transition-colors duration-300
      ${article.status === "PUBLISHED" ? "text-green-400" : "text-snow/40"}`}
          >
            {article.status === "PUBLISHED" ? "Published" : "Draft"}
          </span>

          {/* Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={article.status === "PUBLISHED"}
            // disabled={editArtistStatusIsPending}
            // onClick={handleActiveToggle}
            className={`
        relative flex items-center w-14 h-7 rounded-full
        transition-all duration-300 ease-in-out
        ${
          article.status === "PUBLISHED"
            ? "bg-green-500/20 border border-green-500/30"
            : "bg-snow/10 border border-snow/10"
        }
        
      `}
          >
            <span
              className={`
          absolute left-1 flex items-center justify-center
          w-6 h-6 rounded-full bg-snow
          transition-all duration-300 ease-in-out
          ${article.status === "PUBLISHED" ? "translate-x-6" : "translate-x-0"}
        `}
            >
              {
                /* editArtistStatusIsPending ? (
                <DotsLoader />
              ) : */ <span
                  className={`w-2 h-2 rounded-full ${
                    article.status === "PUBLISHED"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
              }
            </span>
          </button>
        </div>
      </td>
      <td>
        <Link
          href={`/admin/articles/${article.id}`}
          className="btn text-xs mx-auto"
        >
          View Details
        </Link>
      </td>
      <td className="flex justify-center items-center gap-x-4">
        <button
          className="flex items-center justify-between w-24 text-xs btn"
          onClick={onEdit}
        >
          <span>Edit</span>
          <CiEdit className="size-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default ArticlesRow;
