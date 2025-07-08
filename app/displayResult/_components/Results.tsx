"use client";

import { useState, useMemo, useEffect } from "react";
import { LucideImage, LucideList, LucideSparkles } from "lucide-react";
import AnswerDisplay from "./AnswerDisplay";

const tabs = [
  { key: "answer", label: "Answer", Icon: LucideSparkles },
  { key: "images", label: "Images", Icon: LucideImage },
  { key: "sources", label: "Sources", Icon: LucideList },
];

interface ResultsProps {
  query: string;
}

export const Results = ({ query }: ResultsProps) => {
  const [active, setActive] = useState<string>("answer");

  useEffect(() => {
    document.title = query || "Perplexity Search";
  }, [query]);

  const tabContents = useMemo(
    () => ({
      answer: <AnswerDisplay query={query} />,
      images: <p>Your images go here…</p>,
      sources: <p>Your sources go here…</p>,
    }),
    [query]
  );

  return (
    <div className="w-full md:w-[700px] bg-white flex flex-col h-[70vh]">
      <div className="flex-none">
        <h2 className="text-2xl font-semibold text-[#0c1a19] mb-4">{query}</h2>
        <nav className="flex space-x-4 border-b-2 border-gray-200">
          {tabs.map(({ key, label, Icon }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="flex flex-col items-center pb-0 pt-2 bg-none"
              >
                <span
                  className={`flex items-center gap-1 text-sm font-medium
                    ${
                      isActive
                        ? "text-[#0c1a19] font-semibold"
                        : "text-gray-400"
                    }
                    hover:text-[#0c1a19] transition-colors
                  `}
                >
                  <Icon size={16} />
                  {label}
                </span>
                <span
                  className="block mt-2 rounded-full transition-all duration-200"
                  style={{
                    height: isActive ? 3 : 2,
                    width: isActive ? "100%" : 2,
                    background: isActive ? "#1f5b66" : "transparent",
                  }}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Scrollable content section */}
      <div className="flex-1 min-h-0 overflow-auto scrollbar-hide">
        {Object.entries(tabContents).map(([key, content]) => (
          <div
            key={key}
            className={`h-full ${active === key ? "block" : "hidden"}`}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};
