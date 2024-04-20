import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../supabase/types";

type Tag = {
  name: string;
};

type useTagsOptions = {
  supabase: SupabaseClient<Database>;
};

export function useTags({ supabase }: useTagsOptions) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data: tags, error } = await supabase.from("tags").select("*");
      if (error) {
        console.error(error);
        return;
      }
      if (tags) {
        setTags(tags);
      }
    };
    fetchTags();
  }, [supabase]);

  return [tags, setTags] as const;
}
