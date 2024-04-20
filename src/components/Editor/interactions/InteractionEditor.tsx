import { EmbedData } from "@/lib/data/EmbedData";
import { Interaction } from "@/lib/data/interactions.ts";
import { SetStateAction, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import PollManager from "./PollManager";

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

  return (
    <div className="flex flex-col w-full space-y-1">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center bg-primary-bg text-white rounded-md"
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <span className="">{interaction.type}</span>
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
        <div>
          <h1>Quiz</h1>
        </div>
      );
    case "INPUT":
      return (
        <div>
          <h1>Input</h1>
        </div>
      );
    case "PROMO":
      return (
        <div>
          <h1>Promo</h1>
        </div>
      );
    case "LINK":
      return (
        <div>
          <h1>Direct</h1>
        </div>
      );
    case "DIRECT":
      return (
        <div>
          <h1>Profile</h1>
        </div>
      );
    case "PROFILE":
      return (
        <div>
          <h1>Wallet</h1>
        </div>
      );
    case "WALLET":
      return (
        <div>
          <h1>Link</h1>
        </div>
      );
  }
}
