import { EmbedData } from "@/lib/data/EmbedData";
import { SetStateAction, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Input from "../Input";
import TextAreaInput from "../TextAreatInput";

type FooterManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function FooterManager({
  embed,
  setEmbeds,
}: FooterManagerProps) {
  const [expanded, setExpanded] = useState(false);

  const handleFooterChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        footer: {
          ...embed.footer,
          text: value,
        },
      });
      return newEmbeds;
    });
  };

  const handleTimestampChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        timestamp: value,
      });
      return newEmbeds;
    });
  };

  const handleFooterIconUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        footer: {
          ...embed.footer,
          icon_url: value,
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
        <span className="">Footer</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-center justify-start space-y-1">
          <TextAreaInput
            label="Footer"
            className="w-full"
            charLimit={2048}
            onChange={(event) => handleFooterChange(event.target.value)}
            value={embed.footer?.text}
          />
          <div className="flex flex-row w-full items-center justify-start space-x-1">
            <Input
              type="datetime-local"
              label="Timestamp"
              className="w-full"
              onChange={(event) => handleTimestampChange(event.target.value)}
              value={embed.timestamp}
            />
            <Input
              label="Footer Icon URL"
              className="w-full"
              onChange={(event) =>
                handleFooterIconUrlChange(event.target.value)
              }
              value={embed.footer?.icon_url}
            />
          </div>
        </div>
      )}
    </div>
  );
}
