import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database } from "../supabase/types";

type VanityTag = {
  name: string;
};

type useVanityTagsOptions = {
  supabase: SupabaseClient<Database>;
};

export function useVanityTags({ supabase }: useVanityTagsOptions) {
  const [tags, setTags] = useState<VanityTag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data: tags, error } = await supabase
        .from("vanity_tags")
        .select("*");
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
