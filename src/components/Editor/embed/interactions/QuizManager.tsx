import Input from "@/components/Input";
import { EmbedData } from "@/lib/data/EmbedData";
import { Quiz } from "@/lib/data/interactions.ts/quiz";
import { SetStateAction } from "react";
import QuizChoiceManager from "./QuizChoiceManager";
import { PrimaryButton } from "@/components/PrimaryButton";

type QuizManagerProps = {
  embed: EmbedData;
  quizId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function QuizManager({
  embed,
  quizId,
  setEmbeds,
}: QuizManagerProps) {
  const quiz = embed.interactions.find((i) => i.id === quizId) as Quiz;

  const handleQuestionChange = (value: string) => {
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
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
        question: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handleAnswerChange = (value: string) => {
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
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
        answer: value,
      });
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const handleRandomizeChange = (value: boolean) => {
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
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
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
        (i) => i.id === quiz.id
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== quiz.id
      );
      if (!newInteractions) return prevEmbeds;
      const lastId = quiz.choices.sort((a, b) => a.id - b.id).at(-1)?.id;
      newInteractions.splice(interactionIndex, 0, {
        ...quiz,
        choices: [
          ...quiz.choices,
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
        value={quiz.question}
        required={true}
      />
      <Input
        label="Answer"
        className="w-full"
        limit={256}
        onChange={(event) => handleAnswerChange(event.target.value)}
        value={quiz.answer}
        required={true}
      />
      <div className="flex flex-row space-x-5 items-end justify-start">
        <div className="flex flex-col space-y-2 items-center justify-center">
          <div className="flex flex-row space-x-1 items-center justify-start">
            <span>Randomize</span>
            <input
              type="checkbox"
              checked={quiz.randomized}
              onChange={(event) => handleRandomizeChange(event.target.checked)}
            />
          </div>
          <PrimaryButton onClick={addChoice}>Add Choice</PrimaryButton>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center">
          {quiz.choices.map((choice, index) => (
            <QuizChoiceManager
              key={index}
              embed={embed}
              quiz={quiz}
              choiceId={choice.id}
              setEmbeds={setEmbeds}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
