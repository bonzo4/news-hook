import { EmbedData } from "@/lib/data/EmbedData";
import { useTags } from "@/lib/hooks/useTags";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

type EmbedTagManagerProps = {
  embed: EmbedData;
  supabase: SupabaseClient<Database>;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function EmbedTagManager({
  embed,
  setEmbeds,
  supabase,
}: EmbedTagManagerProps) {
  const [expanded, setExpanded] = useState(false);
  const [tags] = useTags({ supabase });

  const onTagChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      // remove embed from array and insert at index the new embed
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        tag: value,
      });
      return newEmbeds;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center bg-primary-bg text-white rounded-md"
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <span className="">Tags</span>
      </div>
      {expanded && (
        <div className="flex flex-wrap gap-3 flex-row w-full items-center justify-start">
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => {
                onTagChange(tag.name);
              }}
              className={`${
                tag.name === embed.tag ? "border-white" : "border-transparent"
              } text-white rounded-md px-2 py-1 bg-secondary-bg border-2`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
