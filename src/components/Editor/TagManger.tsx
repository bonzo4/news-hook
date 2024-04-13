import { Embed } from "@/lib/atoms";
import { useTags } from "@/lib/hooks/useTags";
import { SetStateAction, useState } from "react";

type TagManagerProps = {
  embed: Embed;
  setEmbeds: (args_0: SetStateAction<Embed[]>) => void;
};

export default function TagManager({ embed, setEmbeds }: TagManagerProps) {
  const [expanded, setExpanded] = useState(false);
  const [tags, setTags] = useTags();

  const onTagChange = (value: string) => {
    const updatedTags = tags.map((t) =>
      t.name === value ? { ...t, selected: !t.selected } : t
    );
    setTags(updatedTags);
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      newEmbeds[embedIndex].tags.push(value);
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
          {expanded ? "▼" : "▶"}
        </button>
        <span className="">Tags</span>
      </div>
      {expanded && (
        <div className="flex flex-row w-full space-x-3 items-center justify-start">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => {
                onTagChange(tag.name);
              }}
              className={`${
                tag.selected ? "border-white" : "border-transparent"
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
