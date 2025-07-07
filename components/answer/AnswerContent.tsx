import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IoShareOutline, IoCopyOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { AnswerContentProps } from "../../types/search.types";
import FeedbackButtons from "./FeedbackButtons";

const AnswerContent = memo(
  ({ markdown, imageUrl, searchResults }: AnswerContentProps) => (
    <div className="relative">
      {imageUrl && (
        <figure className="float-right ml-6 mb-4 max-w-xs">
          <img src={imageUrl} alt="Related" className="rounded-md" />
          <figcaption className="text-xs text-gray-500 text-center mt-1">
            {searchResults[0]?.displayLink}
          </figcaption>
        </figure>
      )}

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-6">
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
            <IoShareOutline size={18} /> Share
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
            <IoCopyOutline size={18} /> Export
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
            <LuRefreshCw size={18} /> Rewrite
          </button>
        </div>
        <FeedbackButtons />
      </div>
    </div>
  )
);

AnswerContent.displayName = "AnswerContent";
export default AnswerContent;
