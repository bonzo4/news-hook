import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type Drafts = Database["public"]["Tables"]["news_drafts"]["Row"];

type useDraftsOptions = {
  supabase: SupabaseClient<Database>;
  page?: number;
  refetch?: boolean;
};

export function useDrafts({ supabase, refetch, page = 1 }: useDraftsOptions) {
  const [drafts, setDrafts] = useState<Drafts[]>([]);

  useEffect(() => {
    refetch;
    const fetchDrafts = async () => {
      const start = (page - 1) * 32;
      const end = page * 32 - 1;
      const { data: drafts, error } = await supabase
        .from("news_drafts")
        .select("*")
        .order("created_at", { ascending: false })
        .range(start, end);
      if (error) {
        console.error(error);
        return;
      }
      if (drafts) {
        setDrafts(drafts);
      }
    };
    fetchDrafts();
  }, [supabase, refetch, page]);

  return [drafts, setDrafts] as const;
}
