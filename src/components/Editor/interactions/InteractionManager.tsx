import { SetStateAction, useState } from "react";
import { PrimaryButton } from "../../PrimaryButton";
import { useAtom } from "jotai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { EmbedData } from "@/lib/data/EmbedData";
import { defaultPoll } from "@/lib/data/interactions.ts/poll";
import { defaultQuiz } from "@/lib/data/interactions.ts/quiz";
import { defaultInput } from "@/lib/data/interactions.ts/input";
import { defaultPromo } from "@/lib/data/interactions.ts/promo";
import { defaultDirect } from "@/lib/data/interactions.ts/direct";
import { defaultProfile } from "@/lib/data/interactions.ts/profile";
import { defaultWallet } from "@/lib/data/interactions.ts/wallet";
import { defaultLink } from "@/lib/data/interactions.ts/link";
import InteractionEditor from "./InteractionEditor";

type AuthorManagerProps = {
  embed: EmbedData;
  setEmbeds: (args_0: SetStateAction<EmbedData[]>) => void;
};

export default function InteractionManager({
  embed,
  setEmbeds,
}: AuthorManagerProps) {
  const [expanded, setExpanded] = useState(false);

  const addPoll = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultPoll(lastId)],
      });
      return newEmbeds;
      
    });
  };

  const addQuiz = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultQuiz(lastId)],
      });
      return newEmbeds;
    });
  };

  const addInput = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultInput(lastId)],
      });
      return newEmbeds;
    });
  };

  const addPromo = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultPromo(lastId)],
      });
      return newEmbeds;
    });
  };

  const addDirect = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultDirect(lastId)],
      });
      return newEmbeds;
    });
  };

  const addProfile = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultProfile(lastId)],
      });
      return newEmbeds;
    });
  };

  const addWallet = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [
          ...(embed.interactions ?? []),
          defaultWallet(embed.interactions?.at(-1)?.id),
        ],
      });
      return newEmbeds;
    });
  };

  const addLink = () => {
    setEmbeds((prevEmbeds) => {
      const embedIndex = prevEmbeds.findIndex((e) => e.id === embed.id);
      if (embedIndex === -1) return prevEmbeds;
      const newEmbeds = prevEmbeds.filter((e) => e.id !== embed.id);
      const lastId = embed.interactions.sort((a, b) => a.id - b.id).at(-1)?.id;
      newEmbeds.splice(embedIndex, 0, {
        ...embed,
        interactions: [...(embed.interactions ?? []), defaultLink(lastId)],
      });
      return newEmbeds;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-row w-full space-x-3 items-center justify-start">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center bg-primary-bg text-white rounded-md"
        >
          {expanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </button>
        <span className="">Interactions</span>
      </div>
      {expanded && (
        <div className="flex flex-col w-full items-center justify-start space-y-1">
          <div className="flex flex-row w-full space-x-3 items-center justify-start">
            <PrimaryButton onClick={() => addPoll()}>Poll</PrimaryButton>
            <PrimaryButton onClick={() => addQuiz()}>Quiz</PrimaryButton>
            <PrimaryButton onClick={() => addInput()}>Input</PrimaryButton>
            <PrimaryButton onClick={() => addPromo()}>Promo</PrimaryButton>
            <PrimaryButton onClick={() => addDirect()}>Direct</PrimaryButton>
            <PrimaryButton onClick={() => addProfile()}>Profile</PrimaryButton>
            <PrimaryButton onClick={() => addWallet()}>Wallet</PrimaryButton>
            <PrimaryButton onClick={() => addLink()}>Link</PrimaryButton>
          </div>
        </div>
      )}
      {embed.interactions &&
        embed.interactions.map((interaction, index) => (
          <InteractionEditor
            key={index}
            embed={embed}
            interactionId={interaction.id}
            setEmbeds={setEmbeds}
          />
        ))}
    </div>
  );
}
