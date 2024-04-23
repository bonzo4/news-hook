import { SetStateAction } from "jotai";
import EmbedTagManager from "./EmbedTagManger";
import AuthorManager from "./AuthorManager";
import BodyManager from "./BodyManager";
import FieldsManager from "./FieldsManager";
import ImageManager from "./ImageManager";
import FooterManager from "./FooterManager";
import InteractionManager from "./interactions/InteractionManager";
import { EmbedData } from "@/lib/data/EmbedData";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosTrash,
  IoIosClose,
  IoIosCopy,
} from "react-icons/io";
import EmbedPresetManager from "./EmbedPresetManager";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

type EmbedManagerProps = {
  supabase: SupabaseClient<Database>;
  index: number;
  embed: EmbedData;
  embedCount: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function EmbedManager({
  supabase,
  index,
  embed,
  embedCount,
  setEmbeds,
}: EmbedManagerProps) {
  const expandEmbed = (id: number) => {
    setEmbeds((prevEmbeds) => {
      const embed = prevEmbeds.find((embed) => embed.id === id);
      if (embed) {
        embed.expanded = !embed.expanded;
      }
      return [...prevEmbeds];
    });
  };

  const moveEmbed = (id: number, direction: "up" | "down") => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((embed) => embed.id === id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = [...prevEmbeds];
      const embed = newEmbeds.splice(embedIndex, 1)[0];
      if (direction === "up") {
        newEmbeds.splice(embedIndex - 1, 0, embed);
      } else {
        newEmbeds.splice(embedIndex + 1, 0, embed);
      }
      return newEmbeds;
    });
  };

  const deleteEmbed = (id: number) => {
    setEmbeds((prevEmbeds) => {
      const newEmbeds = prevEmbeds.filter((embed) => embed.id !== id);
      return newEmbeds;
    });
  };

  const copyEmbed = (id: number) => {
    setEmbeds((prevEmbeds) => {
      const embed = prevEmbeds.find((embed) => embed.id === id);
      if (embed) {
        const newEmbed = { ...embed };
        const lastEmbed = prevEmbeds.at(-1);
        newEmbed.id = lastEmbed ? lastEmbed.id + 1 : 0;
        return [...prevEmbeds, newEmbed];
      }
      return prevEmbeds;
    });
  };

  return (
    <div
      className={`flex flex-row grow min-h-100 w-full items-center justify-start space-x-3 shadow-md border-l-4 `}
      style={{ borderColor: embed.color }}
    >
      <div className="flex flex-col w-full justify-start items-center py-3 px-2 space-y-3">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-row space-x-3 items-center justify-center">
            <button
              onClick={() => expandEmbed(embed.id)}
              className="flex items-center justify-center bg-primary-bg text-white rounded-md"
            >
              {embed.expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            <span className="">
              Embed {index + 1} - {embed.title}
            </span>
          </div>
          <div className="flex flex-row">
            <button
              onClick={() => deleteEmbed(embed.id)}
              className="flex items-center justify-center bg-primary-bg text-white rounded-md"
            >
              <IoIosClose size={30} />
            </button>
            <button
              onClick={() => copyEmbed(embed.id)}
              className="flex items-center justify-center bg-primary-bg text-white rounded-md"
            >
              <IoIosCopy />
            </button>
            {embedCount > 1 && index !== 0 && (
              <button
                onClick={() => moveEmbed(embed.id, "up")}
                className="flex items-center justify-center bg-primary-bg text-white rounded-md"
              >
                <IoIosArrowUp />
              </button>
            )}
            {embedCount > 1 && index !== embedCount - 1 && (
              <button
                onClick={() => moveEmbed(embed.id, "down")}
                className="flex items-center justify-center bg-primary-bg text-white rounded-md"
              >
                <IoIosArrowDown />
              </button>
            )}
          </div>
        </div>
        {embed.expanded && (
          <div className="flex flex-col space-y-2 w-full pl-5">
            <EmbedPresetManager
              embed={embed}
              supabase={supabase}
              setEmbeds={setEmbeds}
            />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <EmbedTagManager
              embed={embed}
              supabase={supabase}
              setEmbeds={setEmbeds}
            />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <AuthorManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <BodyManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <FieldsManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <ImageManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <FooterManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[1px] bg-white opacity-10" />
            <InteractionManager embed={embed} setEmbeds={setEmbeds} />
          </div>
        )}
      </div>
    </div>
  );
}
