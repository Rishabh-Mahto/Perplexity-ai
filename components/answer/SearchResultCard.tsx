import { memo } from "react";
import { SearchResult } from "../../types/search.types";

const SearchResultCard = memo(({ result }: { result: SearchResult }) => (
  <div className="flex flex-col gap-1 bg-[#f7f7f6] p-3 rounded-md hover:bg-gray-100 transition-colors">
    <div className="flex items-center mt-[2px] gap-2">
      <div className="w-4 h-4">
        <img
          src={`https://www.google.com/s2/favicons?domain=${result.displayLink}&sz=32`}
          alt=""
          className="w-full h-full rounded-sm"
        />
      </div>
      <p className="text-xs text-gray-600 truncate">{result.displayLink}</p>
    </div>
    <div className="flex-1 w-full">
      <a
        href={result.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:no-underline"
      >
        <h3 className="text-xs font-medium text-[#1a0dab] line-clamp-2">
          {result.title}
        </h3>
      </a>
    </div>
  </div>
));

SearchResultCard.displayName = "SearchResultCard";
export default SearchResultCard;
