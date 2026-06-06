export interface ArtistWork {
  id: string;
  title: string;
  coverUrl: string;
  tags: string[];
  status?: string;
  createdAt?: string;
}

export interface LookbookArtist {
  id: string;
  slug: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  coverUrl: string;
  worksCount: number;
  latestWorks: ArtistWork[];
}

export interface LookbookResponse {
  page: number;
  limit: number;
  total: number;
  items: LookbookArtist[];
}

export interface ArtistWorksResponse {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  items: ArtistWork[];
}

export interface SingleArtistResponse {
  artist: {
    id: string;
    slug: string;
    handle: string;
    displayName: string;
    avatarUrl: string;
    coverUrl: string;
    bio: string;
    bioDe?: string;
    bioEn?: string;
  };
  works: ArtistWorksResponse;
}

// Admin

export interface ArtistInfo {
  id: string;
  studioId?: null | string;
  displayName: string;
  handle: string;
  slug: string;
  email: string;
  phone: string;
  status: string;
  bio: string;
  avatarUrl: string | null;
  coverUrl: string;
  works: ArtistWork[];
}

export interface ArtistResponse {
  page: number;
  limit: number;
  total: number;
  items: ArtistInfo[];
}

export interface ArtistFormDataProps {
  displayName: string;
  handle: string;
  email: string;
  phone: string;
  status: string;
  bio: string;
  worksMeta: { title: string; tags: string[] }[];
  cover?: File;
  works?: File[];
}
