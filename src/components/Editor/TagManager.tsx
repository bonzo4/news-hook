import { Tag, selectedTagsAtom } from "@/lib/atoms";
import { useTags } from "@/lib/hooks/useTags";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useAtom } from "jotai";

type TagManagerProps = {
  supabase: SupabaseClient<Database>;
};

export default function TagManager({ supabase }: TagManagerProps) {
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);

  const [tags] = useTags({ supabase });

  const onTagChange = (value: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(value)) {
        return prevTags.filter((tag) => tag !== value);
      }
      return [...prevTags, value];
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <span className="font-semibold">Tags</span>
      </div>

      <div className="flex flex-wrap gap-3 flex-row w-full items-center justify-start">
        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => {
              onTagChange(tag.name);
            }}
            className={`${
              selectedTags.includes(tag.name)
                ? "border-white"
                : "border-transparent"
            } text-white rounded-md px-2 py-1 bg-secondary-bg border-2`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
