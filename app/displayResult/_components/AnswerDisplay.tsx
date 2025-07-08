"use client";

import AnswerContent from "@/components/answer/AnswerContent";
import SearchResultCard from "@/components/answer/SearchResultCard";
import { useSearch } from "@/hooks/useSearchData";
import { useEffect } from "react";

export default function AnswerDisplay({ query }: { query: string }) {
  const { states, refs, actions } = useSearch(query);
  const {
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
  } = states;

  const fetchData = async () => {
    if (!query) return;

    refs.abortController.current?.abort();
    refs.abortController.current = new AbortController();
    const { signal } = refs.abortController.current;

    setLoadingSearch(true);
    setLoadingAnswer(true);

    try {
      const [searchData, answerData] = await Promise.all([
        actions.fetchSearchResults(signal),
        actions.fetchPerplexityAnswer(signal),
      ]);

      const items = searchData.items || [];
      const slicedResults = items.slice(0, 4);
      const thumb = items[0]?.pagemap?.cse_thumbnail?.[0]?.src;

      setSearchResults(slicedResults);
      if (thumb) setImageUrl(thumb);
      setMarkdown(answerData.markdown || "");

      refs.resultCache.current[query] = {
        searchResults: slicedResults,
        markdown: answerData.markdown || "",
        imageUrl: thumb || "",
      };
      refs.dataFetchedRef.current[query] = true;
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching data:", error);
        setSearchResults([]);
        setMarkdown("");
        setImageUrl("");
      }
    } finally {
      setLoadingSearch(false);
      setLoadingAnswer(false);
    }
  };

  useEffect(() => {
    if (!query || refs.dataFetchedRef.current[query]) return;

    if (refs.resultCache.current[query]) {
      const cached = refs.resultCache.current[query];
      setSearchResults(cached.searchResults);
      setMarkdown(cached.markdown);
      setImageUrl(cached.imageUrl);
      refs.dataFetchedRef.current[query] = true;
      return;
    }

    fetchData();

    return () => {
      refs.abortController.current?.abort();
    };
  }, [query]);

  return (
    <div className="w-full mt-4">
      <div className="w-[100%]">
        {loadingSearch ||
        (!loadingSearch &&
          searchResults.length === 0 &&
          !refs.dataFetchedRef.current[query]) ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {searchResults.map((result, index) => (
              <SearchResultCard key={result.link || index} result={result} />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-sm py-8 text-center">
            No results found.
          </div>
        )}
      </div>

      <section className="prose prose-lg max-w-full border-gray-200 mt-2">
        {loadingAnswer ||
        (!loadingAnswer && !markdown && !refs.dataFetchedRef.current[query]) ? (
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          </div>
        ) : markdown ? (
          <AnswerContent
            markdown={markdown}
            imageUrl={imageUrl}
            searchResults={searchResults}
          />
        ) : (
          <p className="text-gray-400">No answer generated.</p>
        )}
      </section>
    </div>
  );
}
