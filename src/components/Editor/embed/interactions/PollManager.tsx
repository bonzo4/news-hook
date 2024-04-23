import Input from "@/components/Input";
import { PrimaryButton } from "@/components/PrimaryButton";
import { EmbedData } from "@/lib/data/EmbedData";
import { Poll } from "@/lib/data/interactions.ts/poll";
import { SetStateAction } from "react";
import PollChoiceManager from "./PollChoiceManager";

type PollManagerProps = {
  embed: EmbedData;
  pollId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function PollManager({
  embed,
  pollId,
  setEmbeds,
}: PollManagerProps) {
  const poll = embed.interactions.find((i) => i.id === pollId) as Poll;

  const handleQuestionChange = (value: string) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === poll.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== poll.id
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...poll,
        question: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handledRandomizeChange = (value: boolean) => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === poll.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== poll.id
      );
      if (!newInteractions) return prevEmbeds;
      newInteractions.splice(interactionIndex, 0, {
        ...poll,
        randomized: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const addChoice = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === poll.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== poll.id
      );
      if (!newInteractions) return prevEmbeds;
      const lastId = poll.choices.sort((a, b) => a.id - b.id).at(-1)?.id;
      newInteractions.splice(interactionIndex, 0, {
        ...poll,
        choices: [
          ...poll.choices,
          {
            id: lastId ? lastId + 1 : 1,
            text: "",
            emoji: "",
          },
        ],
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
        label="Question"
        className="w-full"
        limit={256}
        onChange={(event) => handleQuestionChange(event.target.value)}
        value={poll.question}
        required={true}
      />
      <div className="flex flex-row space-x-5 items-end justify-start">
        <div className="flex flex-col space-y-2 items-center justify-center">
          <div className="flex flex-row space-x-1 items-center justify-start">
            <span>Randomize</span>
            <input
              type="checkbox"
              checked={poll.randomized}
              onChange={(event) => handledRandomizeChange(event.target.checked)}
            />
          </div>
          <PrimaryButton onClick={addChoice}>Add Choice</PrimaryButton>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center">
          {poll.choices.map((choice, index) => (
            <PollChoiceManager
              key={index}
              embed={embed}
              poll={poll}
              choiceId={choice.id}
              setEmbeds={setEmbeds}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
