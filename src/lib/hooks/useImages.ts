import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type Images = Database["public"]["Tables"]["news_images"]["Row"];

type Options = {
  supabase: SupabaseClient<Database>;
  page: number;
  folder: string | null;
  refetch: boolean;
};

export function useImages({ supabase, page, refetch, folder }: Options) {
  const [images, setImages] = useState<Images[]>([]);

  useEffect(() => {
    refetch;
    const fetchImages = async () => {
      const start = (page - 1) * 14;
      const end = page * 14 - 1;
      const query = supabase
        .from("news_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (folder) {
        query.eq("folder", folder);
      } else {
        query.is("folder", null);
      }
      const { data: images, error } = await query.range(start, end);

      if (error) {
        console.error(error);
        return;
      }
      if (images) {
        setImages(images);
      }
    };

    fetchImages();
  }, [supabase, refetch, page, folder]);

  return [images, setImages] as const;
}
