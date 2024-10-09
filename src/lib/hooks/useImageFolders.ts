import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type ImageFolders = Database["public"]["Tables"]["news_image_folders"]["Row"];

type Options = {
  supabase: SupabaseClient<Database>;
  folder: string | null;
  refetch: boolean;
};

export function useImageFolders({ supabase, refetch, folder }: Options) {
  const [folders, setFolders] = useState<ImageFolders[]>([]);

  useEffect(() => {
    refetch;
    const fetchFolders = async () => {
      const query = supabase.from("news_image_folders").select("*");
      if (folder) {
        query.eq("parent", folder);
      } else {
        query.is("parent", null);
      }
      const { data: folders, error } = await query;

      if (error) {
        console.error(error);
        return;
      }
      if (folders) {
        setFolders(folders);
      }
    };

    fetchFolders();
  }, [supabase, refetch, folder]);

  return [folders, setFolders] as const;
}
