import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type Preset = Database["public"]["Tables"]["embed_presets"]["Row"];

type usePresetsOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function usePresets({ supabase, refetch }: usePresetsOptions) {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    refetch;
    const fetchPresets = async () => {
      const { data: presets, error } = await supabase
        .from("embed_presets")
        .select("*");
      if (error) {
        console.error(error);
        return;
      }
      if (presets) {
        setPresets(presets);
      }
    };
    fetchPresets();
  }, [supabase, refetch]);

  return [presets, setPresets] as const;
}
