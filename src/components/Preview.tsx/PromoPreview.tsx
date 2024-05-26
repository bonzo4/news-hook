import { PrimaryButton } from "../PrimaryButton";
import { Promo } from "@/lib/data/interactions.ts/promo";

type PromoPreviewProps = {
  promo: Promo;
};

export default function PromoPreview({ promo }: PromoPreviewProps) {
  return (
    <div className="flex flex-row gap-2">
      {promo.twitterUrl && (
        <PrimaryButton className="flex flex-row space-x-2">
          Follow
        </PrimaryButton>
      )}
      {promo.tweetUrl && (
        <PrimaryButton className="flex flex-row space-x-2">Like</PrimaryButton>
      )}
      {promo.tweetUrl && (
        <PrimaryButton className="flex flex-row space-x-2">
          Retweet
        </PrimaryButton>
      )}
    </div>
  );
}
