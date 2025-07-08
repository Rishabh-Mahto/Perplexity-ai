import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col items-center bg-[#fafbf6] justify-between md:justify-center h-full w-full rounded-lg">
        {" "}
        <h1 className="text-4xl font-semibold text-[#0c1a19]">perplexity</h1>
        <SearchBox />
      </div>
    </div>
  );
}
