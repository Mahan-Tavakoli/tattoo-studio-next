import { ArticleStatus } from "@/components/schema & types/article/article.types";

import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";

export const articleStatusStyles: Record<
  ArticleStatus,
  {
    label: string;
    className: string;
    icon: React.ReactNode;
  }
> = {
  DRAFT: {
    label: "Draft",
    className: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",

    icon: <HiOutlineClock className="w-4 h-4" />,
  },

  PUBLISHED: {
    label: "Published",
    className: "bg-green-500/10 text-green-400 border border-green-500/20",

    icon: <HiOutlineCheckCircle className="w-4 h-4" />,
  },
};
