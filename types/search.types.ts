export interface SearchResult {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  pagemap?: {
    cse_thumbnail?: Array<{ src: string }>;
  };
}

export interface CachedResult {
  searchResults: SearchResult[];
  markdown: string;
  imageUrl: string;
}

export interface AnswerContentProps {
  markdown: string;
  imageUrl: string;
  searchResults: SearchResult[];
}
