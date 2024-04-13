import { useState } from "react";

export default function BodyManager() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center bg-primary-bg text-white rounded-md"
        >
          {expanded ? "▼" : "▶"}
        </button>
        <span className="font-bold">Body</span>
      </div>
      {expanded && (
        <div className="flex flex-row w-full space-x-3 items-center justify-start">
          Body
        </div>
      )}
    </div>
  );
}
