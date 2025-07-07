import { useState, useRef, useCallback } from "react";
import { SearchResult, CachedResult } from "../types/search.types";

export const useSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  const resultCache = useRef<Record<string, CachedResult>>({});
  const abortController = useRef<AbortController | null>(null);
  const dataFetchedRef = useRef<Record<string, boolean>>({});

  const fetchSearchResults = useCallback(
    async (signal: AbortSignal) => {
      const response = await fetch("/api/google-search-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal,
      });
      if (!response.ok) throw new Error("Search request failed");
      return response.json();
    },
    [query]
  );

  const fetchPerplexityAnswer = useCallback(
    async (signal: AbortSignal) => {
      const response = await fetch("/api/perplexity-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal,
      });
      if (!response.ok) throw new Error("Answer request failed");
      return response.json();
    },
    [query]
  );

  return {
    states: {
      searchResults,
      setSearchResults,
      markdown,
      setMarkdown,
      imageUrl,
      setImageUrl,
      loadingSearch,
      setLoadingSearch,
      loadingAnswer,
      setLoadingAnswer,
    },
    refs: {
      resultCache,
      abortController,
      dataFetchedRef,
    },
    actions: {
      fetchSearchResults,
      fetchPerplexityAnswer,
    },
  };
};
