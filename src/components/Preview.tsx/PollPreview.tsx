import { Poll } from "@/lib/data/interactions.ts/poll";
import { PrimaryButton } from "../PrimaryButton";
import { SecondaryButton } from "../SecondaryButton";
import { Markdown } from "./Markdown";

type PollPreviewProps = {
  poll: Poll;
};

export default function PollPreview({ poll }: PollPreviewProps) {
  if (poll.choices.length === 5) {
    return (
      <div className="flex flex-col gap-2 items-start justify-start">
        <div className="flex flex-wrap gap-2">
          {poll.choices.map((choice) => (
            <PrimaryButton key={choice.id} className="flex flex-row space-x-1">
              <span>{choice.emoji}</span>
              <span>{choice.text}</span>
            </PrimaryButton>
          ))}
        </div>
        <SecondaryButton>Results</SecondaryButton>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {poll.choices.map((choice) => (
        <PrimaryButton key={choice.id} className="flex flex-row space-x-1">
          <span>{choice.emoji}</span>
          <span>{choice.text}</span>
        </PrimaryButton>
      ))}
      <SecondaryButton>Results</SecondaryButton>
    </div>
  );
}
