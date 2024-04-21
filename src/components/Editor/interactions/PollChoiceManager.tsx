import Input from "@/components/Input";
import { SecondaryButton } from "@/components/SecondaryButton";
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

  if (!choice) return null;

  const handleChoiceTextChange = (value: string) => {
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
          text: value,
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

  const handleChoiceEmojiChange = (value: string) => {
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
          emoji: value,
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
  }

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
    <div className="flex flex-row w-full space-x-3 items-center justify-start">
      <Input
        type="text"
        value={choice.text}
        onChange={(e) => handleChoiceTextChange(e.target.value)}
      />
      <Input
        type="text"
        value={choice.text}
        onChange={(e) => handleChoiceEmojiChange(e.target.value)}
      />
      <SecondaryButton onClick={handleDeleteChoice}>Delete</SecondaryButton>
    </div>
  );
}
