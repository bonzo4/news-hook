import { SetStateAction, useState } from "react";
import Input from "../../Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

type ImageManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function ImageManager({ embed, setEmbeds }: ImageManagerProps) {
  const [expanded, setExpanded] = useState(false);

  const handleImageUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        image: {
          ...embed.image,
          url: value,
        },
      });
      return newEmbeds;
    });
  };

  const handleThumbnailUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        thumbnail: {
          ...embed.thumbnail,
          url: value,
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
        <span className="">Image</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-center justify-start space-y-1">
          <Input
            label="Image Url"
            className="w-full"
            onChange={(event) => handleImageUrlChange(event.target.value)}
            value={embed.image?.url}
            required={true}
          />
          <Input
            label="Thumbnail Url"
            className="w-full"
            onChange={(event) => handleThumbnailUrlChange(event.target.value)}
            value={embed.thumbnail?.url}
          />
        </div>
      )}
    </div>
  );
}
