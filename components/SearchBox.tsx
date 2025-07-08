"use client";
import { useRef, useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { PiAtom } from "react-icons/pi";
import { IoBulbOutline } from "react-icons/io5";
import { RiVoiceprintLine } from "react-icons/ri";
import { HiOutlineCpuChip } from "react-icons/hi2";
import { TiMicrophone } from "react-icons/ti";
import { TbWorld } from "react-icons/tb";
import { GoPaperclip } from "react-icons/go";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function SearchBox({
  isFollowUpSearch = false,
}: {
  isFollowUpSearch?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [active, setActive] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isFollowUpSearch || !query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);
    const handler = setTimeout(async () => {
      try {
        const res = await fetch("/api/google-suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query, isFollowUpSearch]);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px";
  };

  const leftIcons = [
    { Icon: BiSearchAlt, about: "Search", key: 0 },
    { Icon: PiAtom, about: "Research", key: 1 },
    { Icon: IoBulbOutline, about: "Labs", key: 2 },
  ];

  const rightIcons = [
    { Icon: HiOutlineCpuChip, about: "Choose a model", key: 0 },
    { Icon: TbWorld, about: "Set sources for search", key: 1 },
    { Icon: GoPaperclip, about: "Attach files", key: 2 },
    { Icon: TiMicrophone, about: "Dictation", key: 3 },
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setQuery(searchQuery);
    setShowSuggestions(false);
    try {
      await router.push(
        `/displayResult?query=${encodeURIComponent(searchQuery)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div
        className={`bg-white rounded-lg border-2 min-h-30 max-h-[500px] overflow-y-auto relative
    ${
      isFollowUpSearch
        ? "mt-0 w-full max-w-[700px]"
        : "mt-0 md:mt-10 w-full max-w-[650px]"
    }
    ${
      showSuggestions
        ? "rounded-b-lg rounded-t-none md:rounded-t-lg md:rounded-b-none pb-[4px]"
        : "rounded-b-lg"
    }
    ${loading ? "border-slate-300/50 opacity-60" : "border-gray-400"}
  `}
      >
        <textarea
          ref={textareaRef}
          className={`w-full min-h-10 max-h-[500px] p-2 text-lg border-none outline-none resize-none
    ${
      loading
        ? "opacity-60 pointer-events-none bg-gray-100 text-gray-400 select-none"
        : ""
    }
  `}
          placeholder={isFollowUpSearch ? "Ask a follow-up" : "Ask anything..."}
          onInput={handleInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSearch(query);
            }
          }}
          disabled={loading}
          style={loading ? { opacity: 0.6 } : {}}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center bg-[#e8eced] rounded-sm w-fit p-[2px] ml-2 mb-2 h-full">
            {leftIcons.map(({ Icon, about, key }) => (
              <HoverCard key={key}>
                <HoverCardTrigger asChild>
                  <span>
                    <Icon
                      size={30}
                      onClick={() => setActive(key)}
                      className={
                        active === key
                          ? "p-[4px] min-w-[35px] bg-white border-2 border-[#2a7480] rounded-md text-[#2a7480] hover:text-[#2a7480] cursor-pointer"
                          : "p-[4px] border-2 border-transparent rounded-md text-gray-500 hover:text-[#2a7480] cursor-pointer"
                      }
                    />
                  </span>
                </HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  className="text-xs w-fit m-0 p-[6px] rounded-sm"
                >
                  {about}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {rightIcons.map(({ Icon, about, key }) => (
              <HoverCard key={key}>
                <HoverCardTrigger asChild>
                  <span>
                    <Icon size={16} className="text-gray-400 cursor-pointer" />
                  </span>
                </HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  className="text-xs w-fit m-0 p-[6px] rounded-sm"
                >
                  {about}
                </HoverCardContent>
              </HoverCard>
            ))}
            {query.trim() || isFollowUpSearch ? (
              <button
                type="button"
                onClick={() => handleSearch(query)}
                className="bg-[#2a7480] text-white p-[4px] rounded-md mr-3 w-[30px] flex items-center justify-center hover:bg-[#1f5b66] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || query.trim() === ""}
                tabIndex={0}
              >
                <ArrowRight size={16} />
              </button>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span>
                    <RiVoiceprintLine
                      size={25}
                      className="bg-[#2a7480] text-white p-[4px] rounded-md mr-3 w-[30px] cursor-pointer hover:bg-[#1f5b66] transition-colors duration-200"
                    />
                  </span>
                </HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  className="text-xs w-fit m-0 p-[6px] rounded-sm"
                >
                  Voice mode
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
      </div>
      {/* Dropdown */}
      {!isFollowUpSearch && showSuggestions && suggestions.length > 0 && (
        <ul
          className={`
      absolute left-0 right-0 
      w-full
      ${isMobile ? "bottom-full" : "top-full"} 
      ${isFollowUpSearch ? "max-w-[700px]" : "max-w-[650px]"}
      bg-white border-2 border-gray-400 shadow-top md:shadow-md rounded-t-lg md:rounded-t-none md:rounded-b-lg translate-y-[5px]
      md:translate-y-[-5px] max-h-60 z-10
      mx-auto
    `}
          style={{ minWidth: 0 }}
        >
          {suggestions.map((suggestion: string, idx: number) => (
            <li
              key={suggestion + idx}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
              onMouseDown={() => handleSearch(suggestion)}
            >
              <BiSearchAlt className="text-gray-400" size={18} />
              <span className="truncate">{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
