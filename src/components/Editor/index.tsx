import { SecondaryButton } from "@/components/SecondaryButton";
import DraftManager from "./DraftManager";
import EmbedEditor from "./EmbedEditor";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

type EditorProps = { supabase: SupabaseClient<Database> };

export default function Editor({ supabase }: EditorProps) {
  return (
    <div className="flex flex-col items-center justify-start space-y-5 grow w-full p-3">
      <DraftManager />
      <EmbedEditor supabase={supabase} />
    </div>
  );
}
