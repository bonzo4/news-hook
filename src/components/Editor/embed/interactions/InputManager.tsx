import Input from "@/components/Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { InputInteraction } from "@/lib/data/interactions.ts/input";
import { SetStateAction } from "react";

type InputMangerProps = {
  embed: EmbedData;
  inputId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function InputManager({
  embed,
  inputId,
  setEmbeds,
}: InputMangerProps) {
  const input = embed.interactions.find(
    (i) => i.id === inputId
  ) as InputInteraction;

  if (!input) return null;

  const handleQuestionChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === input.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== input.id
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...input,
        question: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  return (
    <div>
      <Input
        type="text"
        value={input.question}
        label="Question"
        onChange={(e) => handleQuestionChange(e.target.value)}
        limit={255}
        required={true}
      />
    </div>
  );
}
