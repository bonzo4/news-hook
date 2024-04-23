import { SecondaryButton } from "@/components/SecondaryButton";
import DraftManager from "./DraftManager";
import EmbedEditor from "./embed/EmbedEditor";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { useAtom } from "jotai";
import { embedAtom } from "@/lib/atoms";
import { StaffRole } from "@/lib/hooks/useUser";
import { useEffect } from "react";

type EditorProps = { supabase: SupabaseClient<Database>; staffRole: StaffRole };

export default function Editor({ supabase, staffRole }: EditorProps) {
  const [embeds, setEmbeds] = useAtom(embedAtom);

  useEffect(() => {
    const storedEmbeds = localStorage.getItem("embeds");
    if (storedEmbeds && JSON.parse(storedEmbeds).length > 0) {
      setEmbeds(JSON.parse(storedEmbeds));
    }
  }, [setEmbeds]);

  useEffect(() => {
    if (embeds && embeds.length > 0) {
      localStorage.setItem("embeds", JSON.stringify(embeds));
    }
  }, [setEmbeds, embeds]);

  return (
    <div className="flex flex-col items-center justify-start space-y-5 px-3 py-5 max-h-[90vh] overflow-y-scroll">
      <DraftManager supabase={supabase} embeds={embeds} setEmbeds={setEmbeds} />
      <EmbedEditor
        supabase={supabase}
        embeds={embeds}
        setEmbeds={setEmbeds}
        staffRole={staffRole}
      />
    </div>
  );
}
