"use client";

import { useSearchParams } from "next/navigation";
import SearchBox from "@/components/SearchBox";
import { Header } from "@/app/displayResult/_components/Header";
import { Results } from "@/app/displayResult/_components/Results";

export function DisplayResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <div className="w-full h-full bg-white p-1 sm:p-2 md:p-3">
      {/* top part */}
      <Header />

      {/* Content for the searched result */}
      <div className="flex flex-col justify-between h-[95%] w-full items-center px-2 sm:px-4">
        <Results query={query} />
        <div className="w-full max-w-[700px] sm:max-w-[95vw] md:max-w-[700px]">
          <SearchBox isFollowUpSearch={true} />
        </div>
      </div>
    </div>
  );
}
