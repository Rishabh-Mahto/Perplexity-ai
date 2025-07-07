import { Suspense } from "react";
import { DisplayResultContent } from "./_components/DisplayResultContent";
import { Header } from "./_components/Header";

// Loading component
function DisplayResultLoading() {
  return (
    <div className="w-full h-full bg-white p-1 sm:p-2 md:p-3">
      <Header />
      <div className="flex flex-col justify-between h-[95%] w-full items-center px-2 sm:px-4">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2a7480]"></div>
        </div>
      </div>
    </div>
  );
}

// Main page component (Server Component)
export default function DisplayResult() {
  return (
    <Suspense fallback={<DisplayResultLoading />}>
      <DisplayResultContent />
    </Suspense>
  );
}
