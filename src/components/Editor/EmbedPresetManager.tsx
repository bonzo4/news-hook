import { SetStateAction, useState } from "react";
import Input from "../Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { usePresets } from "@/lib/hooks/usePresets";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { PrimaryButton } from "../PrimaryButton";

type AuthorManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
  supabase: SupabaseClient<Database>;
};

export default function EmbedPresetManager({
  embed,
  setEmbeds,
  supabase,
}: AuthorManagerProps) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");
  const [refetch, setRefetch] = useState(false);

  const [presets] = usePresets({ supabase, refetch });

  const savePreset = async () => {
    if (name.length === 0) return;
    const { data, error } = await supabase.from("embed_presets").insert([
      {
        name,
        embed_json: JSON.parse(JSON.stringify(embed)),
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
    setRefetch(!refetch);
  };

  const selectPreset = (id: number) => {
    console.log(id);
    const preset = presets.find((preset) => preset.id === id);
    if (preset) {
      setEmbeds((prevEmbeds) => {
        const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
        if (embedIndex === -1) return prevEmbeds;
        // remove embed from array and insert at index the new embed
        const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
        console.log(preset.embed_json);
        newEmbeds.splice(embedIndex, 0, preset.embed_json as any);
        return newEmbeds;
      });
      setName(preset.name);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center bg-primary-bg text-white rounded-md"
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <span className="">Presets</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-start justify-center space-y-1">
          <select
            onChange={(e) => selectPreset(parseInt(e.target.value))}
            className="bg-primary-bg text-white rounded-md px-2 py-1"
          >
            {presets.map((preset, index) => (
              <option key={index} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
          <div className="flex flex-row w-full items-center justify-start space-x-3">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PrimaryButton className="mt-5" onClick={() => savePreset()}>
              Save
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
