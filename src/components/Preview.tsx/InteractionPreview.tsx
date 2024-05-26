import { Interaction } from "@/lib/data/interactions.ts";
import PollPreview from "./PollPreview";
import QuizPreview from "./QuizPreview";
import { PrimaryButton } from "../PrimaryButton";
import LinkPreview from "./LinkPreview";
import PromoPreview from "./PromoPreview";

type InteractionPreviewProps = {
  interaction: Interaction;
};

export default function InteractionPreview({
  interaction,
}: InteractionPreviewProps) {
  switch (interaction.type) {
    case "POLL":
      return <PollPreview poll={interaction} />;
    case "QUIZ":
      return <QuizPreview quiz={interaction} />;
    case "INPUT":
      return <PrimaryButton>📝 Enter</PrimaryButton>;
    case "LINK":
      return <LinkPreview link={interaction} />;
    case "DIRECT":
      return <PrimaryButton>Direct</PrimaryButton>;
    case "PROFILE":
      return <PrimaryButton>Profile</PrimaryButton>;
    case "WALLET":
      return (
        <div className="flex flex-row space-x-2">
          <PrimaryButton>SOL Wallet</PrimaryButton>
          <PrimaryButton>ETH Wallet</PrimaryButton>
        </div>
      );
    case "PROMO":
      return <PromoPreview promo={interaction} />;
  }
}
