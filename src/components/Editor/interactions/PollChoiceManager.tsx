import { EmbedData } from "@/lib/data/EmbedData";
import { Poll } from "@/lib/data/interactions.ts/poll";
import { Quiz } from "@/lib/data/interactions.ts/quiz";
import { SetStateAction } from "react";

type PollChoiceManagerProps = {
  embed: EmbedData;
  interaction: Poll | Quiz;
  choiceId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function PollChoiceManager({
  embed,
  interaction,
  choiceId,
  setEmbeds,
}: PollChoiceManagerProps) {
  const choice = interaction.choices.find((c) => c.id === choiceId);

  const handleChoiceChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === interaction.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== interaction.id
      );
      if (!newInteractions) return prevEmbeds;
      const newChoices = interaction.choices.filter((c) => c.id !== choiceId);
      if (!newChoices) return prevEmbeds;
      newChoices.splice(
        newChoices.findIndex((c) => c.id === choiceId),
        0,
        {
          ...choice,
          value,
        }
      );
      newInteractions.splice(interactionIndex, 0, {
        ...interaction,
        choices: newChoices,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handleDeleteChoice = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === interaction.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== interaction.id
      );
      if (!newInteractions) return prevEmbeds;
      const newChoices = interaction.choices.filter((c) => c.id !== choiceId);
      if (!newChoices) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...interaction,
        choices: newChoices,
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
      <input
        type="text"
        value={choice.value}
        onChange={(e) => handleChoiceChange(e.target.value)}
      />
      <button onClick={handleDeleteChoice}>Delete</button>
    </div>
  );
}
