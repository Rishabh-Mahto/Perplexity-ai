import { Bookmark, Ellipsis } from "lucide-react";
import { useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";

export const Header = () => {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div className="flex items-center justify-end gap-3">
      <Ellipsis size={20} className="text-gray-500 cursor-pointer" />
      <button
        className="p-1 rounded-md border transition-colors duration-200 cursor-pointer bg-transparent border-transparent"
        onClick={() => setBookmarked((b) => !b)}
        aria-label="Bookmark"
      >
        <Bookmark
          size={20}
          className="transition-colors duration-200"
          color={bookmarked ? "#2a7480" : "#6b7280"}
          fill={bookmarked ? "#2a7480" : "none"}
        />
      </button>
      <button className="flex items-center gap-1 py-[2px] px-2 bg-[#2a7480] text-white text-sm w-[fit-content] h-[30px] border-1 rounded-md border-[#1f5b66] hover:bg-[#1f5b66] transition-colors duration-200">
        <RiShareForwardLine size={18} />
        Share
      </button>
    </div>
  );
};
