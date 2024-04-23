import Input from "@/components/Input";
import { SecondaryButton } from "@/components/SecondaryButton";
import { EmbedData } from "@/lib/data/EmbedData";
import { Quiz } from "@/lib/data/interactions.ts/quiz";
import { SetStateAction } from "react";
import { IoIosClose } from "react-icons/io";

type QuizChoiceManagerProps = {
  embed: EmbedData;
  quiz: Quiz;
  choiceId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function QuizChoiceManager({
  embed,
  quiz,
  choiceId,
  setEmbeds,
}: QuizChoiceManagerProps) {
  const choice = quiz.choices.find((c) => c.id === choiceId);

  if (!choice) return null;

  const handleChoiceTextChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === quiz.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== quiz.id
      );
      if (!newInteractions) return prevEmbeds;
      const choiceIndex = quiz.choices.findIndex((c) => c.id === choiceId);
      if (choiceIndex === -1) return prevEmbeds;
      const newChoices = quiz.choices.filter((c) => c.id !== choiceId);
      if (!newChoices) return prevEmbeds;
      newChoices.splice(choiceIndex, 0, {
        ...choice,
        text: value,
      });
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
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
        (i) => i.id === quiz.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== quiz.id
      );
      if (!newInteractions) return prevEmbeds;
      const choiceIndex = quiz.choices.findIndex((c) => c.id === choiceId);
      const newChoices = quiz.choices.filter((c) => c.id !== choiceId);
      if (!newChoices) return prevEmbeds;
      newChoices.splice(choiceIndex, 0, {
        ...choice,
        emoji: value,
      });
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
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
        (i) => i.id === quiz.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== quiz.id
      );
      if (!newInteractions) return prevEmbeds;
      const newChoices = quiz.choices.filter((c) => c.id !== choiceId);
      if (!newChoices) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
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
        label="Emoji"
        value={choice.emoji}
        onChange={(e) => handleChoiceEmojiChange(e.target.value)}
      />
      <Input
        type="text"
        value={choice.text}
        label="Text"
        onChange={(e) => handleChoiceTextChange(e.target.value)}
        required={true}
      />
      <button onClick={handleDeleteChoice}>
        <IoIosClose size={30} />
      </button>
    </div>
  );
}
