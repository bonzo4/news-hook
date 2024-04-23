import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type News = Database["public"]["Tables"]["discord_news"]["Row"];

type UseScheduledNewsOptions = {
  supabase: SupabaseClient;
  refetch?: boolean;
};

export function useScheduledNews({
  supabase,
  refetch,
}: UseScheduledNewsOptions) {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("discord_news")
        .select("*")
        .order("schedule", { ascending: true })
        .gt("schedule", new Date().toISOString());
      if (error) {
        console.error(error);
      } else {
        setNews(data);
      }
    };
    fetchNews();
  }, [supabase, refetch]);

  return [news];
}
