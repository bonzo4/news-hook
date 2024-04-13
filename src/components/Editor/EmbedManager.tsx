import { Embed } from "@/lib/atoms";
import { SetStateAction } from "jotai";
import TagManager from "./TagManger";
import AuthorManager from "./AuthorManager";
import BodyManager from "./BodyManager";
import FieldsManager from "./FieldsManager";
import ImageManager from "./ImageManager";
import FooterManager from "./FooterManager";
import InteractionManager from "./InteractionManager";

type EmbedManagerProps = {
  key: number;
  index: number;
  embed: Embed;
  embedCount: number;
  setEmbeds: (args_0: SetStateAction<Embed[]>) => void;
};

export default function EmbedManager({
  key,
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

  return (
    <div
      className={`flex flex-row grow min-h-100 w-full items-center justify-start space-x-3 shadow-md border-l-2 border-white`}
    >
      <div
        key={key}
        className="flex flex-col w-full justify-start items-center py-3 px-2 space-y-3"
      >
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-row space-x-3 items-center justify-center">
            <button
              onClick={() => expandEmbed(embed.id)}
              className="flex items-center justify-center bg-primary-bg text-white rounded-md"
            >
              {embed.expanded ? "▼" : "▶"}
            </button>
            <span className="font-bold">
              Embed {index + 1} - {embed.title}
            </span>
          </div>
          <div className="flex flex-row">
            {embedCount > 1 && index !== 0 && (
              <button
                onClick={() => moveEmbed(embed.id, "up")}
                className="flex items-center justify-center bg-primary-bg text-white rounded-md"
              >
                ▲
              </button>
            )}
            {embedCount > 1 && index !== embedCount - 1 && (
              <button
                onClick={() => moveEmbed(embed.id, "down")}
                className="flex items-center justify-center bg-primary-bg text-white rounded-md"
              >
                ▼
              </button>
            )}
          </div>
        </div>
        {embed.expanded && (
          <div className="flex flex-col space-y-2 w-full pl-5">
            <TagManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[2px] bg-white opacity-25" />
            <AuthorManager embed={embed} setEmbeds={setEmbeds} />
            <div className="w-full h-[2px] bg-white opacity-25" />
            <BodyManager />
            <div className="w-full h-[2px] bg-white opacity-25" />
            <FieldsManager />
            <div className="w-full h-[2px] bg-white opacity-25" />
            <ImageManager />
            <div className="w-full h-[2px] bg-white opacity-25" />
            <FooterManager />
            <div className="w-full h-[2px] bg-white opacity-25" />
            <InteractionManager />
          </div>
        )}
      </div>
    </div>
  );
}
