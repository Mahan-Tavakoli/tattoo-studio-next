export interface ArticleInfo {
  id: string;
  title: string;
  titleDe: string;
  titleEn: string;
  slug: string;
  excerpt: string;
  excerptDe: string;
  excerptEn: string;
  content: string;
  contentDe: string;
  contentEn: string;
  coverUrl: string;
  tags: string[];
  status: ArticleStatus;
  publishedAt: Date /* | null */;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    displayName: string | null;
    authorId?: string;
  };
}

export interface ArticlesResponse {
  page: number;
  limit: number;
  total: number;
  items: ArticleInfo[];
}

// Admin

export interface ArticleFormDataProps {
  title: string;
  excerpt: string;
  content: string;
  status: ArticleStatus;
  cover: File;
  tags: string[];
}

export const ARTICLE_STATUS = ["PUBLISHED", "DRAFT"] as const;

export type ArticleStatus = (typeof ARTICLE_STATUS)[number];
