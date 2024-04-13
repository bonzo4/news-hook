import { useState } from "react";

type Tag = {
  name: string;
  id: string;
  selected: boolean;
};

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([
    { name: "Tag 1", id: "1", selected: false },
    { name: "Tag 2", id: "2", selected: false },
    { name: "Tag 3", id: "3", selected: false },
    { name: "Tag 4", id: "4", selected: false },
    { name: "Tag 5", id: "5", selected: false },
  ]);

  return [tags, setTags] as const;
}
