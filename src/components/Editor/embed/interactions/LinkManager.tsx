import Input from "@/components/Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { LinkInteraction } from "@/lib/data/interactions.ts/link";
import { WalletInteraction } from "@/lib/data/interactions.ts/wallet";
import { SetStateAction } from "react";

type LinkManagerProps = {
  embed: EmbedData;
  linkId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function LinkManager({
  embed,
  linkId,
  setEmbeds,
}: LinkManagerProps) {
  const link = embed.interactions.find(
    (i) => i.id === linkId
  ) as LinkInteraction;

  const handleUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === linkId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter((i) => i.id !== linkId);
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...link,
        url: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handleTextChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === linkId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter((i) => i.id !== linkId);
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...link,
        text: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handleEmojiChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === linkId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter((i) => i.id !== linkId);
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...link,
        emoji: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-1 items-center justify-center">
      <Input
        type="text"
        value={link.url}
        label="URL"
        onChange={(e) => handleUrlChange(e.target.value)}
        required={true}
      />
      <div className="flex flex-row space-x-2 w-full">
        <Input
          type="text"
          value={link.emoji}
          label="Emoji"
          onChange={(e) => handleEmojiChange(e.target.value)}
          required={true}
        />
        <Input
          type="text"
          value={link.text}
          label="Text"
          onChange={(e) => handleTextChange(e.target.value)}
          required={true}
        />
      </div>
    </div>
  );
}
