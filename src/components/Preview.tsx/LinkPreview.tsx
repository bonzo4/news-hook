import { LinkInteraction } from "@/lib/data/interactions.ts/link";
import { PrimaryButton } from "../PrimaryButton";

type LinkPreviewProps = {
  link: LinkInteraction;
};

export default function LinkPreview({ link }: LinkPreviewProps) {
  return (
    <a href={link.url} target="_blank" rel="noreferrer noopener">
      <PrimaryButton className="flex flex-row space-x-2">
        <span>{link.emoji}</span>
        <span>{link.text}</span>
      </PrimaryButton>
    </a>
  );
}
