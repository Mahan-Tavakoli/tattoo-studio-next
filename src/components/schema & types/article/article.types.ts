export interface ArticleInfo {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  tags: string[];
  status?: string;
  publishedAt: Date /* | null */;
  author?: {
    displayName: string | null;
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
  status: string;
  cover: File;
  tags: string[];
}
