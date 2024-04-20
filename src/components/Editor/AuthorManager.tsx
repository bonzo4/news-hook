import { SetStateAction, useState } from "react";
import Input from "../Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

type AuthorManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function AuthorManager({
  embed,
  setEmbeds,
}: AuthorManagerProps) {
  const [expanded, setExpanded] = useState(false);

  const onAuthorChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      // remove embed from array and insert at index the new embed
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        author: {
          ...embed.author,
          name: value,
        },
      });
      return newEmbeds;
    });
  };

  const onAuthorUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      // remove embed from array and insert at index the new embed
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        author: {
          ...embed.author,
          url: value.length !== 0 ? value : undefined,
        },
      });
      return newEmbeds;
    });
  };

  const onAuthorIconUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      // remove embed from array and insert at index the new embed
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        author: {
          ...embed.author,
          icon_url: value.length !== 0 ? value : undefined,
        },
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
        <span className="">Author</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-center justify-start space-y-1">
          <Input
            label="Author"
            className="w-full"
            charLimit={256}
            onChange={(event) => onAuthorChange(event.target.value)}
            value={embed.author?.name}
          />
          <div className="flex flex-row w-full items-center justify-start space-x-1">
            <Input
              label="Author URL"
              className="w-full"
              onChange={(event) => onAuthorUrlChange(event.target.value)}
              value={embed.author?.url}
            />
            <Input
              label="Author Icon URL"
              className="w-full"
              onChange={(event) => onAuthorIconUrlChange(event.target.value)}
              value={embed.author?.icon_url}
            />
          </div>
        </div>
      )}
    </div>
  );
}
