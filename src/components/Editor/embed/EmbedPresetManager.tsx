import { SetStateAction, useState } from "react";
import Input from "../../Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { usePresets } from "@/lib/hooks/usePresets";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { PrimaryButton } from "../../PrimaryButton";
import { SecondaryButton } from "../../SecondaryButton";

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
  const [preset, setPreset] = useState<{ name: string; id?: number }>({
    name: "",
  });
  const [refetch, setRefetch] = useState(false);

  const [presets] = usePresets({ supabase, refetch });

  const handlePresetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const presetMatch = presets.find(
      (preset) => preset.name === e.target.value
    );
    if (presetMatch) {
      setPreset({ name: presetMatch.name, id: presetMatch.id });
      return;
    }
    setPreset({ name: e.target.value });
  };

  const savePreset = async () => {
    if (preset.name.length === 0) return;
    if (preset.id) {
      const { data, error } = await supabase
        .from("embed_presets")
        .update({ name: preset.name, embed_json: embed })
        .eq("id", preset.id)
        .select()
        .single();
      if (error) {
        console.error(error);
      }
      if (data) {
        setPreset({ name: data.name, id: data.id });
      }
      setRefetch(!refetch);
      return;
    }
    const { data, error } = await supabase
      .from("embed_presets")
      .insert([
        {
          name: preset.name,
          embed_json: JSON.parse(JSON.stringify(embed)),
        },
      ])
      .select()
      .single();
    if (error) {
      console.error(error);
    }
    if (data) {
      setPreset({ name: data.name, id: data.id });
    }
    setRefetch(!refetch);
  };

  const selectPreset = (id: number) => {
    const embedPreset = presets.find((preset) => preset.id === id);
    if (embedPreset) {
      setEmbeds((prevEmbeds) => {
        const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
        if (embedIndex === -1) return prevEmbeds;
        // remove embed from array and insert at index the new embed
        const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
        // generate a random id for the new embed that doesn't exist in the array
        const embedIds = newEmbeds.map((e) => e.id);
        let newId = Math.floor(Math.random() * 100000);
        while (embedIds.includes(newId)) {
          newId = Math.floor(Math.random() * 100000);
        }
        newEmbeds.splice(embedIndex, 0, {
          ...(embedPreset.embed_json as any),
          id: newId,
        } as any);
        return newEmbeds;
      });
      setPreset({ name: embedPreset.name, id: id });
    }
  };

  const deletePreset = async (id: number) => {
    const { data, error } = await supabase
      .from("embed_presets")
      .delete()
      .eq("id", id);
    if (error) {
      console.error(error);
    }
    setPreset({ name: "" });
    setRefetch(!refetch);
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
          <div className="flex flex-row items-center justify-start space-x-3">
            <select
              onChange={(e) => selectPreset(parseInt(e.target.value))}
              className="bg-primary-bg text-white rounded-md px-2 py-1 border-4 border-secondary-bg"
            >
              <option className="flex flex-row space-x-2">New Embed</option>
              {presets.map((presetEmbed, index) => (
                <option
                  key={index}
                  value={presetEmbed.id}
                  className="flex flex-row space-x-2"
                  selected={presetEmbed.id === preset.id}
                >
                  {presetEmbed.name}
                </option>
              ))}
            </select>
            {preset.id && (
              <SecondaryButton
                onClick={() => deletePreset(preset.id as number)}
              >
                Delete
              </SecondaryButton>
            )}
          </div>
          <div className="flex flex-row w-full items-center justify-start space-x-3">
            <Input
              label="Name"
              value={preset.name}
              onChange={handlePresetNameChange}
              required={true}
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
