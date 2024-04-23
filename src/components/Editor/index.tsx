import { SecondaryButton } from "@/components/SecondaryButton";
import DraftManager from "./DraftManager";
import EmbedEditor from "./embed/EmbedEditor";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { useAtom } from "jotai";
import { embedAtom } from "@/lib/atoms";

type EditorProps = { supabase: SupabaseClient<Database> };

export default function Editor({ supabase }: EditorProps) {
  const [embeds, setEmbeds] = useAtom(embedAtom);

  return (
    <div className="flex flex-col items-center justify-start space-y-5 p-3 overflow-y-scroll">
      <DraftManager supabase={supabase} embeds={embeds} setEmbeds={setEmbeds} />
      <EmbedEditor supabase={supabase} embeds={embeds} setEmbeds={setEmbeds} />
    </div>
  );
}
