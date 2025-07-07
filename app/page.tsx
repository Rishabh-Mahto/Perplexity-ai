import Sidebar from "@/components/SideBar";
import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col items-center  bg-[#fafbf6] justify-center h-full w-full">
        {" "}
        <h1 className="text-4xl font-semibold text-[#0c1a19]">perplexity</h1>
        <SearchBox />
      </div>
    </div>
  );
}
