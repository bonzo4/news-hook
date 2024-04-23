import { SetStateAction, useAtom } from "jotai";
import { PrimaryButton } from "../../PrimaryButton";
import EmbedManager from "./EmbedManager";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import TagManager from "../TagManager";
import VanityTagManager from "../VanityTagManager";
import { StaffRole, useStaffUser } from "@/lib/hooks/useUser";
import ScheduleManager from "../ScheduleManager";
import { EmbedData } from "@/lib/data/EmbedData";

type EmbedEditorProps = {
  supabase: SupabaseClient<Database>;
  embeds: EmbedData[];
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
  staffRole: StaffRole;
};

export default function EmbedEditor({
  supabase,
  embeds,
  setEmbeds,
  staffRole,
}: EmbedEditorProps) {
  const addEmbed = () => {
    setEmbeds((prevEmbeds) => {
      const lastEmbed = prevEmbeds.at(-1);
      return [
        ...prevEmbeds,
        {
          id: lastEmbed ? lastEmbed.id + 1 : 0,
          expanded: true,
          title: "Title",
          color: "#ffffff",
          author: {
            name: "",
          },
          tag: "all",
          image: {
            url: "https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/GrayNonbanner.jpg?t=2024-03-29T06%3A14%3A19.425Z",
          },
          interactions: [],
          reactions: [],
        },
      ];
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      {embeds.map((embed, index) => (
        <EmbedManager
          supabase={supabase}
          key={embed.id}
          index={index}
          embed={embed}
          embedCount={embeds.length}
          setEmbeds={setEmbeds}
        />
      ))}
      <div className="flex justify-start">
        <PrimaryButton onClick={addEmbed} className="w-auto">
          Add Embed
        </PrimaryButton>
      </div>

      <div className="flex flex-col space-y-4">
        <TagManager supabase={supabase} />
        <VanityTagManager supabase={supabase} />
        {staffRole && staffRole.staff_role === "ADMIN" && (
          <ScheduleManager
            supabase={supabase}
            staffRole={staffRole}
            embeds={embeds}
          />
        )}
      </div>
    </div>
  );
}
