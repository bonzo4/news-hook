import Input from "@/components/Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { SetStateAction } from "react";
import { Promo } from "@/lib/data/interactions.ts/promo";

type PromoManagerProps = {
  embed: EmbedData;
  promoId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function PromoManager({
  embed,
  promoId,
  setEmbeds,
}: PromoManagerProps) {
  const promo = embed.interactions.find((i) => i.id === promoId) as Promo;

  const handleTwitterUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === promo.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== promo.id
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...promo,
        twitterUrl: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handleTweetUrlChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === promo.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== promo.id
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...promo,
        tweetUrl: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input
        label="Twitter URL"
        className="w-full"
        limit={256}
        onChange={(event) => handleTwitterUrlChange(event.target.value)}
        value={promo.twitterUrl}
        required={true}
      />
      <Input
        label="Tweet URL"
        className="w-full"
        limit={256}
        onChange={(event) => handleTweetUrlChange(event.target.value)}
        value={promo.tweetUrl}
        required={true}
      />
    </div>
  );
}
