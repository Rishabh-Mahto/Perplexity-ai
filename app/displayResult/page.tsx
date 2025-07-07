"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Header } from "./_components/Header";
import { Results } from "./_components/Results";
import SearchBox from "@/components/SearchBox";

export default function DisplayResult() {
  const searchParams = useSearchParams();
  const answer = searchParams.get("answer") || "";
  const query = searchParams.get("query") || "";

  return (
    <div className="w-full h-full bg-white p-3">
      {/* top part */}
      <Header />

      {/* Content for the searched result */}
      <div className="flex flex-col justify-between h-[95%] w-full items-center">
        <Results query={query} />
        <SearchBox isFollowUpSearch={true} />
      </div>
    </div>
  );
}
