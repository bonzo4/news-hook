import { SetStateAction, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { EmbedData } from "@/lib/data/EmbedData";
import ColorInput from "@/components/ColorInput";
import Input from "@/components/Input";
import TextAreaInput from "@/components/TextAreatInput";

type BodyManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function BodyManager({ embed, setEmbeds }: BodyManagerProps) {
  const [expanded, setExpanded] = useState(false);

  const onColorChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        color: value,
      });
      return newEmbeds;
    });
  };

  const onTitleChange = (value: string) => {
    if (value.length > 256) return;
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        title: value,
      });
      return newEmbeds;
    });
  };

  const onDescriptionChange = (value: string) => {
    if (value.length > 4096) return;
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        description: value,
      });
      return newEmbeds;
    });
  };

  const onUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        url: value,
      });
      return newEmbeds;
    });
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
        <span className="">Body</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-center justify-start space-y-1">
          <ColorInput
            color={embed.color}
            label="Color"
            onColorChange={onColorChange}
          />
          <Input
            label="Title"
            className="w-full"
            limit={256}
            value={embed.title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
          <TextAreaInput
            label="Description"
            className="w-full"
            limit={4096}
            value={embed.description}
            onChange={(event) => onDescriptionChange(event.target.value)}
          />
          <Input
            label="URL"
            className="w-full"
            onChange={(event) => onUrlChange(event.target.value)}
            value={embed.url}
          />
        </div>
      )}
    </div>
  );
}
