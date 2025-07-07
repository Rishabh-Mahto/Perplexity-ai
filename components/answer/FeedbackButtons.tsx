import { memo } from "react";
import { ThumbsUp, ThumbsDown, RefreshCcw } from "lucide-react";

const FeedbackButtons = memo(() => (
  <div className="flex space-x-4 text-gray-400">
    <button
      aria-label="Upvote"
      className="p-1.5 rounded-md hover:text-gray-600 hover:bg-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
    >
      <ThumbsUp size={18} />
    </button>
    <button
      aria-label="Downvote"
      className="p-1.5 rounded-md hover:text-gray-600 hover:bg-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
    >
      <ThumbsDown size={18} />
    </button>
    <button
      aria-label="Regenerate"
      className="p-1.5 rounded-md hover:text-gray-600 hover:bg-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
    >
      <RefreshCcw size={18} />
    </button>
  </div>
));

FeedbackButtons.displayName = "FeedbackButtons";
export default FeedbackButtons;
