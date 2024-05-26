import { EmbedData } from "@/lib/data/EmbedData";
import { Interaction } from "@/lib/data/interactions.ts";
import { SetStateAction, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosClose,
  IoIosCopy,
} from "react-icons/io";
import PollManager from "./PollManager";
import QuizManager from "./QuizManager";
import InputManager from "./InputManager";
import WalletManager from "./WalletManager";
import LinkManager from "./LinkManager";
import PromoManager from "./PromoManager";

type InteractionEditorProps = {
  embed: EmbedData;
  interactionId: number;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function InteractionEditor({
  embed,
  interactionId,
  setEmbeds,
}: InteractionEditorProps) {
  const [expanded, setExpanded] = useState(false);

  const interaction = embed.interactions?.find(
    (interaction) => interaction.id === interactionId
  );

  if (!interaction) return null;

  const interactionIndex = embed.interactions.findIndex(
    (i) => i.id === interactionId
  );

  const deleteInteraction = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const newInteractions = embed.interactions?.filter(
        (i) => i.id !== interactionId
      );
      if (!newInteractions) return prevEmbeds;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const moveInteraction = (direction: "UP" | "DOWN") => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === interactionId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = embed.interactions.filter(
        (i) => i.id !== interactionId
      );
      if (!newInteractions) return prevEmbeds;
      const newIndex =
        direction === "UP" ? interactionIndex - 1 : interactionIndex + 1;
      newInteractions.splice(newIndex, 0, interaction);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  const copyInteraction = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const interactionIndex = embed.interactions.findIndex(
        (i) => i.id === interactionId
      );
      if (interactionIndex === -1) return prevEmbeds;
      const newInteractions = [...embed.interactions, interaction];
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: newInteractions,
      });
      return newEmbeds;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-1">
      {interactionIndex !== 0 && (
        <div className="w-full h-[1px] bg-white opacity-10" />
      )}
      <div className="flex flex-row w-full space-x-3 items-center justify-between">
        <div className="flex flex-row  space-x-3 items-center justify-start">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center bg-primary-bg text-white rounded-md"
          >
            {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          <span className="">{interaction.type}</span>
        </div>
        <div className="flex flex-row space-x-2 items-center justify-start">
          <button
            onClick={() => deleteInteraction()}
            className="flex items-center justify-center bg-primary-bg text-white rounded-md"
          >
            <IoIosClose size={30} />
          </button>
          <button
            onClick={() => copyInteraction()}
            className="flex items-center justify-center bg-primary-bg text-white rounded-md"
          >
            <IoIosCopy />
          </button>
          {embed.interactions.length > 1 && interactionIndex !== 0 && (
            <button
              onClick={() => moveInteraction("UP")}
              className="flex items-center justify-center bg-primary-bg text-white rounded-md"
            >
              <IoIosArrowUp />
            </button>
          )}
          {embed.interactions.length > 1 &&
            interactionIndex !== embed.interactions.length - 1 && (
              <button
                onClick={() => moveInteraction("DOWN")}
                className="flex items-center justify-center bg-primary-bg text-white rounded-md"
              >
                <IoIosArrowDown />
              </button>
            )}
        </div>
      </div>
      {expanded && (
        <InteractionSection
          embed={embed}
          interactionId={interactionId}
          setEmbeds={setEmbeds}
        />
      )}
    </div>
  );
}

function InteractionSection({
  embed,
  interactionId,
  setEmbeds,
}: InteractionEditorProps) {
  const interaction = embed.interactions?.find(
    (interaction) => interaction.id === interactionId
  );

  if (!interaction) return null;

  switch (interaction.type) {
    case "POLL":
      return (
        <PollManager
          embed={embed}
          pollId={interaction.id}
          setEmbeds={setEmbeds}
        />
      );
    case "QUIZ":
      return (
        <QuizManager
          embed={embed}
          quizId={interaction.id}
          setEmbeds={setEmbeds}
        />
      );
    case "INPUT":
      return (
        <InputManager
          embed={embed}
          inputId={interaction.id}
          setEmbeds={setEmbeds}
        />
      );
    case "LINK":
      return (
        <LinkManager
          embed={embed}
          linkId={interaction.id}
          setEmbeds={setEmbeds}
        />
      );
    case "DIRECT":
      return (
        <div>
          <h1>DIRECT</h1>
        </div>
      );
    case "PROFILE":
      return (
        <div>
          <h1>PROFILE</h1>
        </div>
      );
    case "WALLET":
      return (
        <WalletManager
          embed={embed}
          walletId={interaction.id}
          setEmbeds={setEmbeds}
        />
      );
    case "PROMO":
      return (
        <PromoManager
          embed={embed}
          promoId={interaction.id}
          setEmbeds={setEmbeds}
        />
      );
  }
}
